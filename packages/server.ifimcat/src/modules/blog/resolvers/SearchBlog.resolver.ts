import { Resolver, Query, Args } from "@nestjs/graphql";
import { BlogService } from "../blog.service";
import { Blog } from "../entity/blog.entity";

@Resolver()
export class SearchBlogsResolver {
  constructor(private readonly blogService: BlogService) { }

  @Query(() => [Blog], { nullable: 'itemsAndList' })
  async getBlogByKeywords(@Args('keywords') keywords: string) {
    return this.blogService.getBlogByKeywords(keywords)
  }
}