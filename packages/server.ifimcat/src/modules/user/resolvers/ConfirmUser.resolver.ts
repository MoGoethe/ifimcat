import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { User } from "../entity/user.entity";
import { UserService } from "../user.service";


@Resolver(User)
export class ConfirmUserResolver {
  constructor(private readonly userService: UserService){}

  @Mutation(() => Boolean)
  async confirmUser(
    @Args('token') token: string
  ):Promise<boolean> {
    return this.userService.confirmUser(token)
  }
}
