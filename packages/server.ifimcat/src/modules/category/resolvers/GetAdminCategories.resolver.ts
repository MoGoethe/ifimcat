import { Resolver, Query, Context } from "@nestjs/graphql";
import { CategoryService } from "../category.service";
import { UseGuards } from "@nestjs/common";
import { Category } from "../entity/category.entity";
import { GQLAuthGuard } from "../../../auth/auth.guard";
import { UserRoleType } from "../../../constants/userRoles.constants";
import { GraphQLContext } from "../../../shared/context";


@Resolver()
export class GetAdminCategoriesResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(new GQLAuthGuard(UserRoleType.ADMIN))
  @Query(() => [Category], {nullable: 'itemsAndList'})
  async getAdminCategories(
    @Context() context: GraphQLContext,
  ) {
    return this.categoryService.getAdminCategories(context.req.currentUser!)
  }
}