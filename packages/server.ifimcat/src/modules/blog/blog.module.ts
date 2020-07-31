import { Module } from "@nestjs/common";
import { BlogController } from "./blog.controller";
import { BlogService } from "./blog.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Blog } from "./entity/blog.entity";
import {
  GetBlogsResolver,
  CreateBlogResolver,
  DeleteBlogResolver,
  UpdateBlogResolver,
} from './resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Blog])],
  controllers: [BlogController],
  providers: [
    BlogService,
    GetBlogsResolver,
    CreateBlogResolver,
    DeleteBlogResolver,
    UpdateBlogResolver,
  ],
})
export class BlogModule {}
