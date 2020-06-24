import {
  Resolver,
  Mutation,
  Args,
  Context
} from '@nestjs/graphql';
import { User } from '../entity/user.entity';
import { UserService } from '../user.service';
import { LoginInput } from '../input/login.input';
import { GraphQLContext } from '../../../shared/context';

@Resolver()
export class LoginResolver{
  constructor(private readonly userService: UserService){}

  @Mutation(() => User)
  async login(
    @Args('data') loginData: LoginInput,
    @Context() ctx: GraphQLContext,
  ) {
    return this.userService.login(loginData, ctx.req);
  }
}