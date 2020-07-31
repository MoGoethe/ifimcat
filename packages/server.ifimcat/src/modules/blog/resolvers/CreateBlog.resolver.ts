import { Resolver, Args, Context, Mutation } from "@nestjs/graphql";
import { Blog } from "../entity/blog.entity";
import { BlogService } from "../blog.service";
import { UseGuards } from "@nestjs/common";
import { GQLAuthGuard } from "../../../auth/auth.guard";
import { UserRoleType } from "../../../constants/userRoles.constants";
import { CreateBlogInput } from "../input/CreateBlog.input";
import { GraphQLContext } from "../../../shared/context";

@Resolver()
export class CreateBlogResolver {
  constructor(private readonly blogService: BlogService){}

  @UseGuards(new GQLAuthGuard(UserRoleType.EDITOR))
  @Mutation(() => Blog)
  async createBlog(
    @Args('data') createBlogInput: CreateBlogInput,
    @Context() context: GraphQLContext
  ) {
    console.log(context.req.currentUser)
    return this.blogService.createBlog(context.req.currentUser!, createBlogInput);
  }
}