import { Resolver, Mutation, Context } from "@nestjs/graphql";
import { User } from "../entity/user.entity";
import { UserService } from "../user.service";
import { GraphQLContext } from "../../../shared/context";


@Resolver(User)
export class LogoutResolver {
  constructor(private readonly userService: UserService){}

  @Mutation(() => Boolean)
  async logout(
    @Context() ctx: GraphQLContext
  ):Promise<boolean> {
    return this.userService.logout(ctx);
  }
}
