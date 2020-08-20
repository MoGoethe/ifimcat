import { Resolver, Query } from "@nestjs/graphql";
import { User } from "../entity/user.entity";
import { UserService } from "../user.service";
import { UserRoleType } from '../../../constants/userRoles.constants';
import { GQLAuthGuard } from '../../../auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(User)
export class GetUsersResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { nullable: 'itemsAndList' })
  @UseGuards(new GQLAuthGuard(UserRoleType.ADMIN))
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }
}