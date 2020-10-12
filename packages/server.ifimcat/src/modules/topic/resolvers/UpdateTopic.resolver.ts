import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { Topic } from "../entity/topic.entity";
import { TopicService } from "../topic.service";
import { GQLAuthGuard } from "../../../auth/auth.guard";
import { UseGuards } from "@nestjs/common";
import { UserRoleType } from "../../../constants/userRoles.constants";
import { UpdateTopicInput } from '../input/updateTopic.input';
import { NAUpdateTopicInput } from "../input/naUpdateTopic.input";

@Resolver()
export class UpdateTopicResolver {
  constructor(private readonly topicService: TopicService){}

  @UseGuards(new GQLAuthGuard(UserRoleType.ADMIN))
  @Mutation(() => Topic)
  async updateTopic(
    @Args('data') updateTopicInput: UpdateTopicInput,
  ) {
    return this.topicService.updateTopic(updateTopicInput);
  } 

  @Mutation(() => Topic)
  async naUpdateTopic(
    @Args('data') naUpdateTopicInput: NAUpdateTopicInput,
  ) {
    return this.topicService.updateTopic(naUpdateTopicInput);
  }
}