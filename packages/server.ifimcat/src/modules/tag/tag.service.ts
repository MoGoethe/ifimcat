import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tag } from "./entity/tag.entity";
import { CreateTagInput } from "./input/createTag.input";
import { UpdateTagInput } from "./input/updateTag.input";
import { User } from "../user/entity/user.entity";

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ){}

  hello(): string {
    return 'hello world!'
  }

  async getTags(): Promise<Tag[]> {
    return this.tagRepository.find({ relations: ['author', 'blogs'] });
  }

  async createTag(author: User, createTagInput: CreateTagInput): Promise<Tag> {
    return this.tagRepository.create({...createTagInput, author}).save();
  }

  async updateTag(updateTagInput: UpdateTagInput): Promise<Tag | undefined> {
    const tag = await this.tagRepository.findOne(updateTagInput.id);
    if (!tag) {
      throw new NotFoundException("修改失败，内容不存在");
    }
    Object.assign(tag, updateTagInput);
    await this.tagRepository.save(tag);
    return this.tagRepository.findOne(updateTagInput.id, { relations: ['author', 'blogs'] });
  }

  async deleteTag(id: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne(id);
    if (!tag) {
      throw new NotFoundException("删除失败，内容不存在");
    }
    return this.tagRepository.remove(tag)
  }

}