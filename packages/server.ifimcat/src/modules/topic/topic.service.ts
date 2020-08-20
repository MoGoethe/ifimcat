import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Topic } from "./entity/topic.entity";
import { CreateTopicInput } from "./input/createTopic.input";
import { User } from "../user/entity/user.entity";

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>
  ){}

  hello(): string {
    return 'hello world!'
  }

  async getTopics(): Promise<Topic[]> {
    return this.topicRepository.find({ relations: ['author', 'blogs'] });
  }

  async createTopic(author: User, createTopicInput: CreateTopicInput): Promise<Topic> {
    return this.topicRepository.create({...createTopicInput, author}).save();
  }

  async updateTopic(id: number, name: string): Promise<Topic> {
    const topic =  await this.topicRepository.findOne(id);
    if (!topic) {
      throw new NotFoundException("修改失败，内容不存在");
    }
    topic.name = name;
    return this.topicRepository.save(topic);
  }

  async deleteTopic(id: number): Promise<Topic> {
    const topic = await this.topicRepository.findOne(id);
    if (!topic) {
      throw new NotFoundException("删除失败，内容不存在");
    }
    return this.topicRepository.remove(topic)
  }

}