import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { Category } from "./entity/category.entity";
import { 
  GetCategoriesResolver,
  CreateCategoryResolver,
  UpdateCategoryResolver,
  DeleteCategoryResolver,
  GetAdminCategoriesResolver,
} from "./resolvers";

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    GetCategoriesResolver,
    CreateCategoryResolver,
    UpdateCategoryResolver,
    DeleteCategoryResolver,
    GetAdminCategoriesResolver,
  ],
})
export class CategoryModule{}