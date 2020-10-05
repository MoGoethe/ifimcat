import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { Tag } from "../entity/tag.entity";
import { TagService } from "../tag.service";
import { GQLAuthGuard } from "../../../auth/auth.guard";
import { UseGuards } from "@nestjs/common";
import { UserRoleType } from "../../../constants/userRoles.constants";
import { UpdateTagInput } from "../input/updateTag.input";

@Resolver()
export class UpdateTagResolver {
  constructor(private readonly tagService: TagService){}

  @UseGuards(new GQLAuthGuard(UserRoleType.ADMIN))
  @Mutation(() => Tag)
  async updateTag(
    @Args('data') updateTagInput: UpdateTagInput,
  ) {
    return this.tagService.updateTag(updateTagInput);
  }
}