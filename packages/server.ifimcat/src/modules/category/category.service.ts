import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./entity/category.entity";
import { CreateCategoryInput } from "./input/createCategory.input";
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
    return this.categoryRepository.find();
  }

  async createCategory(author: User, createCategorynput: CreateCategoryInput): Promise<Category> {
    return this.categoryRepository.create({...createCategorynput, author}).save();
  }

  async updateCategory(id: number, name: string): Promise<Category> {
    const category =  await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundException("修改失败，内容不存在");
    }
    category.name = name;
    return this.categoryRepository.save(category);
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

}