import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { Topic } from "../entity/topic.entity";
import { TopicService } from "../topic.service";
import { CreateTopicInput } from "../input/createTopic.input";
import { UseGuards } from "@nestjs/common";
import { GQLAuthGuard } from "../../../auth/auth.guard";
import { UserRoleType } from "../../../constants/userRoles.constants";
import { GraphQLContext } from "../../../shared/context";

@Resolver(Topic)
export class CreateTopicResolver {
  constructor(private readonly topicService: TopicService){}

  @UseGuards(new GQLAuthGuard(UserRoleType.ADMIN))
  @Mutation(() => Topic)
  async createTopic(
    @Args('data') createTopicInput: CreateTopicInput,
    @Context() context: GraphQLContext,
  ) {
    return this.topicService.createTopic(context.req.currentUser!, createTopicInput);
  }
}