import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { User } from "../entity/user.entity";
import { UserService } from "../user.service";
import { UpdateUserInput } from "../input/updateUser.input";
import { UserRoleType } from "../../../constants/userRoles.constants";
import { GQLAuthGuard } from "../../../auth/auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver(User)
export class UpdateUserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, {nullable: true})
  @UseGuards(new GQLAuthGuard(UserRoleType.ADMIN))
  async updateUser( @Args('data') updateUserData: UpdateUserInput ): Promise<User | null> {
    return this.userService.updateUser(updateUserData);
  }
}
