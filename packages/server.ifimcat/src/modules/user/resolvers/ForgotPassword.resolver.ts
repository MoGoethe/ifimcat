import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { UserService } from "../user.service";

@Resolver()
export class ForgetPasswordResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean)
  async forgotPassword(@Args('email') email: string): Promise<boolean> {
    return await this.userService.forgotPassword(email);
  }
}
