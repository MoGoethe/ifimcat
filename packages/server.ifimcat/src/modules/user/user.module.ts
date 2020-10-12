import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  RegisterResolver,
  LoginResolver,
  ConfirmUserResolver,
  CurrentUserResolver,
  ChangePasswordResolver,
  ForgetPasswordResolver,
  LogoutResolver,
  GetUsersResolver,
  UpdateUserResolver,
} from './resolvers';
import { User } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    RegisterResolver,
    LoginResolver,
    LogoutResolver,
    ConfirmUserResolver,
    CurrentUserResolver,
    ChangePasswordResolver,
    ForgetPasswordResolver,
    GetUsersResolver,
    UpdateUserResolver,
  ],
})
export class UserModule {};