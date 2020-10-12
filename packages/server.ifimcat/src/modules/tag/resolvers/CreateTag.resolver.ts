import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { Tag } from "../entity/tag.entity";
import { TagService } from "../tag.service";
import { CreateTagInput } from "../input/createTag.input";
import { UseGuards } from "@nestjs/common";
import { GQLAuthGuard } from "../../../auth/auth.guard";
import { UserRoleType } from "../../../constants/userRoles.constants";
import { GraphQLContext } from "../../../shared/context";

@Resolver(Tag)
export class CreateTagResolver {
  constructor(private readonly tagService: TagService){}

  @UseGuards(new GQLAuthGuard(UserRoleType.ADMIN))
  @Mutation(() => Tag)
  async createTag(
    @Args('data') createTagInput: CreateTagInput,
    @Context() context: GraphQLContext,
  ) {
    return this.tagService.createTag(context.req.currentUser!, createTagInput);
  }
}