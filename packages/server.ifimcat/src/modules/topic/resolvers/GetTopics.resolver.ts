import { 
  Resolver,
  Query
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
}