import { 
  Resolver,
  Query,
  Args
} from "@nestjs/graphql";
import { TopicService } from "../topic.service";
import { Topic } from "../entity/topic.entity";

@Resolver()
export class GetTopicsResolver {
  constructor(private readonly topicService: TopicService){}

  @Query(() => [Topic], {nullable: 'itemsAndList'})
  async getTopics() {
    return this.topicService.getTopics();
  }

  @Query(() => Topic)
  async getTopic(@Args('key') key: string) {
    return this.topicService.getTopicByKey(key);
  }
}