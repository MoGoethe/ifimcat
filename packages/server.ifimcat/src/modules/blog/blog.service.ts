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
    const { title, description, body, category, topic, tags } = createBlogInput;

    const _category = await Category.findOneOrFail(category);
    const _topic = await Topic.findOneOrFail(topic);
    
    const _tags = await Tag.findByIds(tags);
    const blog = await this.blogRepository.create({
      title,
      description,
      draft: body,
      body,
      category: _category,
      topic: _topic,
      tags: _tags,
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

  async updateBlog(author: User, updateBlogInput: UpdateBlogInput): Promise<Blog | undefined> {
    const blog = await this.blogRepository.findOne(updateBlogInput.id, { where: { author } });
    const _blog = await this.blogRepository.findOne({ where: { title: updateBlogInput.title } });
    if (_blog) {
      throw new NotFoundException("此标题已存在，请使用其他标题。");
    }
    const { title, description, body, glance, awesome, is_show, draft } = updateBlogInput;

    if (!blog) {
      throw new NotFoundException("该内容不存在");
    }
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (body) blog.body = body;
    if (draft) blog.draft = draft;
    if (glance) blog.glance = glance;
    if (awesome) blog.awesome = awesome;
    if (is_show !== undefined) blog.is_show = is_show;

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
    await this.blogRepository.save(blog)

    return this.blogRepository.findOne({ id: updateBlogInput.id }, { relations: ['author', 'topic', 'category', 'tags']});
  }

  async getAdminBlogs(admin: User): Promise<Blog[]> {
    if (admin.roles.includes(UserRoleType.ADMIN)) {
      return this.blogRepository.find({relations:['author', 'topic', 'category', 'tags']})
    }
    return this.blogRepository.find({where: {author: admin}, relations:['author', 'topic', 'category', 'tags']})
  }

  async getBlogByKey(key: string): Promise<Blog | null> {
    const blog = await this.blogRepository.findOne({ key }, { relations: ['author', 'topic', 'category', 'tags'] });
    if (blog) {
      return blog;
    }
    return null;
  }

  async getBlogById(id: number): Promise<Blog | undefined> {
    return this.blogRepository.findOne(id, { relations: ['author', 'topic', 'category', 'tags'] })
  }
}