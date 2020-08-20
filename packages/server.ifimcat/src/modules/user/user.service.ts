import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcryptjs';
import { Request } from 'express';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterInput } from './input/register.input';
import { sendMail } from '../../utils/sendEmail';
import { createConfirmationUrl, createForgotPasswordUrl } from '../../utils/createConfirmationUrl';
import { LoginInput } from './input/login.input';
import { redis } from '../../redis';
import { confirmationPrefix, forgotPasswordPrefix } from '../../constants/redisPrefixes';
import { GraphQLContext } from '../../shared/context';
import { ChangePasswordInput } from './input/changePassword.input';
import { UpdateUserInput } from './input/updateUser.input';
import { UserRoleType } from '../../constants/userRoles.constants';
import config from '../../config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){
    this.__initSuperAdmin()
  }

  hello(): string {
    return 'world';
  }

  async register(data: RegisterInput): Promise<User> {
    const user = await this.userRepository.create({...data});
    await sendMail(data.email, createConfirmationUrl(user.id));
    await this.userRepository.save(user);
    return user;
  }

  async login(loginInput: LoginInput, req: Request): Promise<User> {
    const { email, password } = loginInput;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    if (user.forbid) {
      throw new UnauthorizedException('用户已被禁用，请联系管理员');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedException('密码错误');
    }
    req.session!.userId = user.id
    return user
  }

  async logout(ctx: GraphQLContext): Promise<any> {
    return new Promise((resolve, reject) => {
      ctx.req.session!.destroy(err => {
        if (err) {
          return reject(false);
        }
        return resolve(true);
      })
    });
  }

  async confirmUser(token: string): Promise<boolean> {
    const userId = await redis.get(confirmationPrefix + token);
    if (!userId) {
      return false;
    }
    await User.update({id: parseInt(userId)}, {confirmed: true});
    redis.del(confirmationPrefix + token);
    return true;
  }

  async currentUser(ctx: GraphQLContext): Promise<User | null> {
    const { userId } = ctx.req.session!;
    if (!userId) {
      return null;
    }
    return await User.findOneOrFail({id: userId}, {relations: ['blogs', 'topics', 'categories']});
  }

  async forgotPassword(email: string): Promise<boolean> {
    const user = await User.findOne({where: {email}});
    if (!user) {
      return false;
    }
    await sendMail(user.email,  createForgotPasswordUrl(user.id))
    return true;
  }
  
  async changePassword({password, token}: ChangePasswordInput): Promise<User | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);
    console.log(userId)
    if (!userId) {
      return null;
    }
    const user = await User.findOne(userId);
    if (!user) {
      return null
    }
    user.password = await bcrypt.hash(password, 10);
    await redis.del(forgotPasswordPrefix + token);
    await user.save();
    return user;
  }

  async updateUser({ userId, username, roles, forbid}: UpdateUserInput): Promise<User | null> {
    const user = await User.findOne(userId);
    if (!user) { return null }

    if (roles) { user.roles = roles; }
    if (username) { user.username = username; }
    if (forbid !== undefined) { user.forbid = forbid; }
    await user.save();

    return user;
  }

  async getUsers() {
    return await this.userRepository.find({ relations: ['blogs', 'topics', 'categories']});
  }

  async __initSuperAdmin() {
    const { username, email, password } = config.admin
    const _adminUser = await User.findOne({where: {username, email}});
    if (!_adminUser) {
      const _newAdminUser = {} as User;
      _newAdminUser.username = username;
      _newAdminUser.password = await bcrypt.hash(password, 10);
      _newAdminUser.email = email;
      _newAdminUser.roles = [UserRoleType.GHOST, UserRoleType.EDITOR, UserRoleType.PUBLISH, UserRoleType.ADMIN];
      _newAdminUser.confirmed = true;
      await User.insert(_newAdminUser);
    }
  }

};