import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { Category } from "../entity/category.entity";
import { CategoryService } from "../category.service";
import { GQLAuthGuard } from "../../../auth/auth.guard";
import { UseGuards } from "@nestjs/common";
import { UserRoleType } from "../../../constants/userRoles.constants";

@Resolver()
export class UpdateCategoryResolver {
  constructor(private readonly categoryService: CategoryService){}

  @UseGuards(new GQLAuthGuard(UserRoleType.ADMIN))
  @Mutation(() => Category)
  async updateCategory(
    @Args('id') id: number,
    @Args('name') name: string
  ) {
    return this.categoryService.updateCategory(id, name);
  }
}