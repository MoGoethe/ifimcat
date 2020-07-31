import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Context, Args } from "@nestjs/graphql";
import { BlogService } from "../blog.service";
import { Blog } from "../entity/blog.entity";
import { GQLAuthGuard } from "../../../auth/auth.guard";
import { UserRoleType } from "../../../constants/userRoles.constants";
import { GraphQLContext } from "../../../shared/context";

@Resolver()
export class GetBlogsResolver {
  constructor(private readonly blogService: BlogService){}

  @Query(() => [Blog], {nullable: "itemsAndList"})
  async getBlogs(): Promise<Blog[]> {
    return this.blogService.getBlogs();
  }

  @UseGuards(new GQLAuthGuard(UserRoleType.EDITOR))
  @Query(() => [Blog], {nullable: 'itemsAndList'})
  async getAdminBlogs(@Context() context: GraphQLContext) {
    return this.blogService.getAdminBlogs(context.req.currentUser!)
  }

  @Query(() => Blog, {nullable: true})
  async getBlogByKey(@Args('key') key: string) {
    return this.blogService.getBlogByKey(key)
  }
}