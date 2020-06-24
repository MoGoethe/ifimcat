import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { UserService } from "../user.service";
import { User } from "../entity/user.entity";
import { ChangePasswordInput } from "../input/changePassword.input";

@Resolver()
export class ChangePasswordResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, {nullable: true})
  async changePassword(
    @Args('data') changePasswordInput: ChangePasswordInput,
  ): Promise<User | null> {
    return this.userService.changePassword(changePasswordInput)
  }
}