import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { User } from "../entity/user.entity";
import { UserService } from "../user.service";
import { UpdateUserInput } from "../input/updateUser.input";
import { GraphQLContext } from "../../../shared/context";

@Resolver(User)
export class UpdateUserResolver {
  constructor(private readonly userService: UserService){}

  @Mutation(() => Boolean)
  async confirmUser(
    @Args('data') updateUserData: UpdateUserInput,
    @Context() ctx: GraphQLContext
  ):Promise<User | null> {
    const userId = ctx.req.session && ctx.req.session.userId || -1;
    return this.userService.updateUser(userId ,updateUserData);
  }
}
