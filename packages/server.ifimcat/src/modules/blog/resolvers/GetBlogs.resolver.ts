import { Resolver, Query } from "@nestjs/graphql";
import { Blog } from "../entity/blog.entity";
import { BlogService } from "../blog.service";

@Resolver()
export class GetBlogsResolver {
  constructor(private readonly blogService: BlogService){}

  @Query(() => [Blog], {nullable: "itemsAndList"})
  async getBlogs(): Promise<Blog[]> {
    return this.blogService.getBlogs();
  }
}