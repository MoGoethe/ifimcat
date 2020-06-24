import { 
  Resolver,
  Query
} from "@nestjs/graphql";
import { CategoryService } from "../category.service";
import { Category } from "../entity/category.entity";

@Resolver()
export class GetCategoriesResolver {
  constructor(private readonly categoryService: CategoryService){}

  @Query(() => [Category], {nullable: 'itemsAndList'})
  async getCategories() {
    return this.categoryService.getCategories();
  }
}