import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { Tag } from "../entity/tag.entity";
import { TagService } from "../tag.service";
import { GQLAuthGuard } from "../../../auth/auth.guard";
import { UseGuards } from "@nestjs/common";
import { UserRoleType } from "../../../constants/userRoles.constants";

@Resolver()
export class DeleteTagResolver {
  constructor(private readonly tagService: TagService){}

  @UseGuards(new GQLAuthGuard(UserRoleType.ADMIN))
  @Mutation(() => Tag)
  async deleteTag(@Args('id') id: number) {
    return this.tagService.deleteTag(id);
  }
}
