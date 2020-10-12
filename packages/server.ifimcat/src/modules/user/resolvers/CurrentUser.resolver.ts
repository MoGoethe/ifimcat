import { Resolver, Query, Context } from "@nestjs/graphql";
import { User } from "../entity/user.entity";
import { GraphQLContext } from "../../../shared/context";
import { UserService } from "../user.service";


@Resolver(User)
export class CurrentUserResolver {
  constructor(private readonly userService: UserService){}

  @Query(() => User, {nullable: true})
  async currentUser(
    @Context() ctx: GraphQLContext,
  ): Promise<User | null> {
    return this.userService.currentUser(ctx);
  }
}