import { 
  Resolver,
  Query,
  Args,
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

  @Query(() => Category)
  async getCategory(@Args('key') key: string) {
    console.log(key, '~~--~--~--~--~--~--~--~--~--')
    return this.categoryService.getCategoryByKey(key);
  }
}