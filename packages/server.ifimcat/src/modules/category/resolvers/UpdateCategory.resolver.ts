import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { Category } from "../entity/category.entity";
import { CategoryService } from "../category.service";
import { GQLAuthGuard } from "../../../auth/auth.guard";
import { UseGuards } from "@nestjs/common";
import { UserRoleType } from "../../../constants/userRoles.constants";
import { UpdateCategoryInput } from "../input/updateCategory.input";
import { NAUpdateCategoryInput } from "../input/naUpdateCategory.input";

@Resolver()
export class UpdateCategoryResolver {
  constructor(private readonly categoryService: CategoryService){}

  @UseGuards(new GQLAuthGuard(UserRoleType.ADMIN))
  @Mutation(() => Category)
  async updateCategory(
    @Args('data') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.updateCategory(updateCategoryInput);
  }

  @Mutation(() => Category)
  async naUpdateCategory(
    @Args('data') naUpdateCategoryInput: NAUpdateCategoryInput,
  ) {
    return this.categoryService.updateCategory(naUpdateCategoryInput);
  }
}