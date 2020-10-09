import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./entity/category.entity";
import { CreateCategoryInput } from "./input/createCategory.input";
import { UpdateCategoryInput } from "./input/updateCategory.input";
import { User } from "../user/entity/user.entity";
import { UserRoleType } from "../../constants/userRoles.constants";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ){}

  hello(): string {
    return 'hello world!'
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['author', 'blogs']});
  }

  async createCategory(author: User, createCategorynput: CreateCategoryInput): Promise<Category> {
    return this.categoryRepository.create({...createCategorynput, author}).save();
  }

  async updateCategory(updateCategoryInput: UpdateCategoryInput): Promise<Category | undefined> {
    const category = await this.categoryRepository.findOne(updateCategoryInput.id);
    if (!category) {
      throw new NotFoundException("修改失败，内容不存在");
    }
    Object.assign(category, updateCategoryInput);
    await this.categoryRepository.save(category);
    return this.categoryRepository.findOne(updateCategoryInput.id, { relations: ['author', 'blogs'] });
  }

  async deleteCategory(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundException("删除失败，内容不存在");
    }
    return this.categoryRepository.remove(category)
  }

  async getAdminCategories(admin: User): Promise<Category[]> {
    if (admin.roles.includes(UserRoleType.ADMIN)) {
      return this.categoryRepository.find()
    }
    return this.categoryRepository.find({where: {author: admin}})
  }

  async getCategoryByKey(key: string): Promise<Category | undefined> {
    return this.categoryRepository.findOne({ where: { key }, relations: ['blogs', 'author'] });
  }
}