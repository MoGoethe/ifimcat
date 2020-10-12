import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { Category } from "../entity/category.entity";
import { CategoryService } from "../category.service";
import { GQLAuthGuard } from "../../../auth/auth.guard";
import { UseGuards } from "@nestjs/common";
import { UserRoleType } from "../../../constants/userRoles.constants";

@Resolver()
export class DeleteCategoryResolver {
  constructor(private readonly cageoryService: CategoryService){}

  @UseGuards(new GQLAuthGuard(UserRoleType.ADMIN))
  @Mutation(() => Category)
  async deleteCategory(@Args('id') id: number) {
    return this.cageoryService.deleteCategory(id);
  }
}
