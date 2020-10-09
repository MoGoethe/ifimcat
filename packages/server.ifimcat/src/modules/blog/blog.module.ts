import { Module } from "@nestjs/common";
import { BlogController } from "./blog.controller";
import { BlogService } from "./blog.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Blog } from "./entity/blog.entity";
import { Tag } from "../tag/entity/tag.entity";
import {
  GetBlogsResolver,
  CreateBlogResolver,
  DeleteBlogResolver,
  UpdateBlogResolver,
  SearchBlogsResolver,
} from './resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, Tag])],
  controllers: [BlogController],
  providers: [
    BlogService,
    GetBlogsResolver,
    CreateBlogResolver,
    DeleteBlogResolver,
    UpdateBlogResolver,
    SearchBlogsResolver,
  ],
})
export class BlogModule {}
