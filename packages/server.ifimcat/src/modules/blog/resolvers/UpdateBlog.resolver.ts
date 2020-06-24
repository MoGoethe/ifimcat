import { Resolver, Mutation, Context, Args } from "@nestjs/graphql";
import { Blog } from "../entity/blog.entity";
import { BlogService } from "../blog.service";
import { UseGuards } from "@nestjs/common";
import { GQLAuthGuard } from "../../../auth/auth.guard";
import { UserRoleType } from "../../../constants/userRoles.constants";
import { GraphQLContext } from "../../../shared/context";
import { UpdateBlogInput } from "../input/UpdateBlog.input";

@Resolver()
export class UpdateBlogResolver {
  constructor(private readonly blogService: BlogService){}

  @UseGuards(new GQLAuthGuard(UserRoleType.EDITOR))
  @Mutation(() => Blog)
  async updateBlog(
    @Context() context: GraphQLContext,
    @Args('data') updateBlogInput: UpdateBlogInput
  ) {
    return this.blogService.updateBlog(context.req.currentUser!, updateBlogInput);
  }
}