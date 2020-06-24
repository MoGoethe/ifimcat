import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { Category } from "../entity/category.entity";
import { CategoryService } from "../category.service";
import { CreateCategoryInput } from "../input/createCategory.input";
import { UseGuards } from "@nestjs/common";
import { GQLAuthGuard } from "../../../auth/auth.guard";
import { UserRoleType } from "../../../constants/userRoles.constants";
import { GraphQLContext } from "../../../shared/context";

@Resolver(Category)
export class CreateCategoryResolver {
  constructor(private readonly categoryService: CategoryService){}

  @UseGuards(new GQLAuthGuard(UserRoleType.ADMIN))
  @Mutation(() => Category)
  async createCategory(
    @Args('data') createCategoryInput: CreateCategoryInput,
    @Context() context: GraphQLContext,
  ) {
    return this.categoryService.createCategory(context.req.currentUser!, createCategoryInput);
  }
}