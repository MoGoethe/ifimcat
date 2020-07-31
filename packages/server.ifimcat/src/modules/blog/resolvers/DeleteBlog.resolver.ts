import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { Blog } from "../entity/blog.entity";
import { BlogService } from "../blog.service";
import { UseGuards } from "@nestjs/common";
import { GQLAuthGuard } from "../../../auth/auth.guard";
import { UserRoleType } from "../../../constants/userRoles.constants";

@Resolver()
export class DeleteBlogResolver {
  constructor(private readonly blogService: BlogService){}

  @UseGuards(new GQLAuthGuard(UserRoleType.EDITOR))
  @Mutation(() => Blog)
  async deleteBlog(@Args('id') id: number): Promise<Blog> {
    return this.blogService.deleteBlog(id);
  }
}