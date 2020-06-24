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
} from './resolvers';
import { User } from './entity/user.entity';
// import { UserRole } from '../userRole/entity/userRole.entity';

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
    ForgetPasswordResolver
  ],
})
export class UserModule {};