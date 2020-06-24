import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { Topic } from "../entity/topic.entity";
import { TopicService } from "../topic.service";
import { GQLAuthGuard } from "../../../auth/auth.guard";
import { UseGuards } from "@nestjs/common";
import { UserRoleType } from "../../../constants/userRoles.constants";

@Resolver()
export class DeleteTopicResolver {
  constructor(private readonly topicService: TopicService){}

  @UseGuards(new GQLAuthGuard(UserRoleType.ADMIN))
  @Mutation(() => Topic)
  async deleteTopic(@Args('id') id: number) {
    return this.topicService.deleteTopic(id);
  }
}
