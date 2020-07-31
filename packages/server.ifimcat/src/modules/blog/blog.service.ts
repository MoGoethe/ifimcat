import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Blog } from "./entity/blog.entity";
import { Repository } from "typeorm";
import { CreateBlogInput } from "./input/CreateBlog.input";
import { User } from "../user/entity/user.entity";
import { UpdateBlogInput } from "./input/UpdateBlog.input";
import { Tag } from "../tag/entity/tag.entity";
import { Topic } from "../topic/entity/topic.entity";
import { Category } from "../category/entity/category.entity";
import { UserRoleType } from "../../constants/userRoles.constants";

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>
  ){}

  hello(): string {
    return 'world'
  }

  async getBlogs(): Promise<Blog[]> {
    return await this.blogRepository.find({relations:['author', 'topic', 'category', 'tags']});
  }

  async createBlog(author: User, createBlogInput: CreateBlogInput): Promise<Blog> {
    const { title, description, body, categoryId, topicId, tagsId } = createBlogInput;

    const category = await Category.findOneOrFail(categoryId);
    const topic = await Topic.findOneOrFail(topicId);
    
    const tags = await Tag.findByIds(tagsId);
    const blog = await this.blogRepository.create({
      title,
      description,
      body,
      category,
      topic,
      tags,
      author
    });
    return await blog.save()
  }

  async deleteBlog(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOne(id)
    if (!blog) {
      throw new NotFoundException("该内容不存在");
    }
    return this.blogRepository.remove(blog);
  }

  async updateBlog(author: User, updateBlogInput: UpdateBlogInput): Promise<Blog> {
    const blog = await this.blogRepository.findOne(updateBlogInput.id, {where: {author}})
    const { title, description, body, glance, awesome, is_show } = updateBlogInput;

    if (!blog) {
      throw new NotFoundException("该内容不存在");
    }
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (body) blog.body = body;
    if (glance) blog.glance = glance;
    if (awesome) blog.awesome = awesome;
    if (is_show) blog.is_show = is_show;

    if (updateBlogInput.tags) {
      const tags = await Tag.findByIds(updateBlogInput.tags);
      if (!tags.length) {
        throw new NotFoundException("该博客至少需要一个标签");
      }
      blog.tags = tags;
    }
    if (updateBlogInput.topic) {
      const topic = await Topic.findOne({id: updateBlogInput.topic});
      if (!topic) {
        throw new NotFoundException("该话题不存在");
      }
      blog.topic = topic;
    }
    if (updateBlogInput.category) {
      const category = await Category.findOne({id: updateBlogInput.category});
      if (!category) {
        throw new NotFoundException("该类别不存在");
      }
      blog.category = category;
    }

    return this.blogRepository.save(blog);
  }

  async getAdminBlogs(admin: User): Promise<Blog[]> {
    if (admin.roles.includes(UserRoleType.ADMIN)) {
      return this.blogRepository.find({relations:['author', 'topic', 'category', 'tags']})
    }
    return this.blogRepository.find({where: {author: admin}, relations:['author', 'topic', 'category', 'tags']})
  }

  async getBlogByKey(key: string): Promise<Blog | null> {
    return this.blogRepository.findOneOrFail({key});
  }
}