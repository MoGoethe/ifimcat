import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Blog } from "./entity/blog.entity";
import { Repository } from "typeorm";
import { CreateBlogInput } from "./input/createBlog.input";
import { User } from "../user/entity/user.entity";
import { UpdateBlogInput } from "./input/updateBlog.input";
import { Tag } from "../tag/entity/tag.entity";
import { Topic } from "../topic/entity/topic.entity";
import { Category } from "../category/entity/category.entity";
import { UserRoleType } from "../../constants/userRoles.constants";
import { NAUpdateBlogInput } from "./input/naUpdateBlog.input";

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ){}

  hello(): string {
    console.log(this.tagRepository)
    return 'world'
  }

  async getBlogs(): Promise<Blog[]> {
    return await this.blogRepository.find({relations:['author', 'topic', 'category', 'tags']});
  }

  async createBlog(author: User, createBlogInput: CreateBlogInput): Promise<Blog> {
    const { title, description, body, category, topic, tags } = createBlogInput;

    const _category = await Category.findOneOrFail(category);
    const _topic = await Topic.findOneOrFail(topic);
    
    const _tags = await Tag.findByIds(tags, {relations: ['blogs']});
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
    const result = await blog.save();
    _tags.map(async tag => {
      tag.blogs.push(result);
      await this.tagRepository.save(tag);
    })
    return result;
  }

  async deleteBlog(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOne(id, { relations: ['tags'] })
    if (!blog) {
      throw new NotFoundException("该内容不存在");
    }
    blog.tags.map(async tag => {
      const tagBlogs = tag.blogs.filter(item => item.id != blog.id);
      tag.blogs = tagBlogs;
      await this.tagRepository.save(tag);
    })
    return this.blogRepository.remove(blog);
  }

  async updateBlog(author: User, updateBlogInput: UpdateBlogInput): Promise<Blog | undefined> {
    const blog = await this.blogRepository.findOne(updateBlogInput.id, { where: { author },relations: ['tags', 'topic', 'category'] });
    if (!blog) {
      throw new NotFoundException("该内容不存在");
    }
    const _blog = await this.blogRepository.findOne({ where: { title: updateBlogInput.title } });
    if (_blog && (_blog.id != blog.id)) {
      throw new NotFoundException("此标题已存在，请使用其他标题。");
    }
    const { title, description, body, glance, awesome, is_show, draft } = updateBlogInput;
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (body) blog.body = body;
    if (draft) blog.draft = draft;
    if (glance) blog.glance = glance;
    if (awesome) blog.awesome = awesome;
    if (is_show !== undefined) blog.is_show = is_show;

    if (updateBlogInput.tags) {
      const tags = await Tag.findByIds(updateBlogInput.tags);
      const originTagIds = blog.tags.map(oTag => oTag.id);
      
      const restultTagIds = [...originTagIds, ...updateBlogInput.tags].filter((item, index, self) => {
        return self.indexOf(item) == index;
      });
      if (!tags.length) {
        throw new NotFoundException("该博客至少需要一个标签");
      }
      const resultTags = await Tag.findByIds(restultTagIds, { relations: ['blogs'] });
      resultTags.map(async rTag => {
        const tagBlogIndex = rTag.blogs.findIndex(item => item.id === blog.id);
        if (tagBlogIndex === -1) {
          rTag.blogs.push(blog);
        } else {
          rTag.blogs.splice(tagBlogIndex, 1);
        }
        await this.tagRepository.save(rTag);
      })
      blog.tags = tags;
    }
    if (updateBlogInput.topic) {
      const topic = await Topic.findOne({id: updateBlogInput.topic});
      if (!topic) {
        throw new NotFoundException("该专题不存在");
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

  async naUpdateBlog(naUpdateBlogInput: NAUpdateBlogInput): Promise<Blog | undefined> {
    const blog = await this.blogRepository.findOne(naUpdateBlogInput.id, { relations: ['tags', 'topic', 'category'] });
    if (!blog) {
      throw new NotFoundException("该内容不存在");
    }
    const { glance, awesome } = naUpdateBlogInput;
    if (glance) blog.glance = glance;
    if (awesome) blog.awesome = awesome;
    await this.blogRepository.save(blog);
    return this.blogRepository.findOne({ id: naUpdateBlogInput.id }, { relations: ['author', 'topic', 'category', 'tags'] });
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

  async getBlogByKeywords(keywrods: string): Promise<Blog[] | null> {
    return this.blogRepository.createQueryBuilder("blog")
      .where("blog.title LIKE :keywrods")
      .setParameters({
        keywrods: '%' + keywrods + '%'
      })
      .orderBy("blog.id", "ASC")
      .getMany();
  }
}