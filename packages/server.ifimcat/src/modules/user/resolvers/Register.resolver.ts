import {
  Resolver,
  Query,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { User } from '../entity/user.entity';
import { UserService } from '../user.service';
import { RegisterInput } from '../input/register.input';

@Resolver()
export class RegisterResolver{
  constructor(private readonly userService: UserService){}

  @Query(() => String, {nullable: true})
  async hello() {
    return 'hello world!'
  }

  @Mutation(() => User)
  async register(
    @Args('data') registerData: RegisterInput
  ) {
    return this.userService.register(registerData)
  }
}