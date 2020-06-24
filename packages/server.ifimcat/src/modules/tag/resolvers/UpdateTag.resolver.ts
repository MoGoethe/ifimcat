import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { Tag } from "../entity/tag.entity";
import { TagService } from "../tag.service";
import { GQLAuthGuard } from "../../../auth/auth.guard";
import { UseGuards } from "@nestjs/common";
import { UserRoleType } from "../../../constants/userRoles.constants";

@Resolver()
export class UpdateTagResolver {
  constructor(private readonly tagService: TagService){}

  @UseGuards(new GQLAuthGuard(UserRoleType.ADMIN))
  @Mutation(() => Tag)
  async updateTag(
    @Args('id') id: number,
    @Args('name') name: string
  ) {
    return this.tagService.updateTag(id, name);
  }
}