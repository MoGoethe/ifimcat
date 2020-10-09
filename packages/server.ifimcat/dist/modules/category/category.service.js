"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entity/category.entity");
const userRoles_constants_1 = require("../../constants/userRoles.constants");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    hello() {
        return 'hello world!';
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.find({ relations: ['author', 'blogs'] });
        });
    }
    createCategory(author, createCategorynput) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.create(Object.assign(Object.assign({}, createCategorynput), { author })).save();
        });
    }
    updateCategory(updateCategoryInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.findOne(updateCategoryInput.id);
            if (!category) {
                throw new common_1.NotFoundException("修改失败，内容不存在");
            }
            Object.assign(category, updateCategoryInput);
            yield this.categoryRepository.save(category);
            return this.categoryRepository.findOne(updateCategoryInput.id, { relations: ['author', 'blogs'] });
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.findOne(id);
            if (!category) {
                throw new common_1.NotFoundException("删除失败，内容不存在");
            }
            return this.categoryRepository.remove(category);
        });
    }
    getAdminCategories(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            if (admin.roles.includes(userRoles_constants_1.UserRoleType.ADMIN)) {
                return this.categoryRepository.find();
            }
            return this.categoryRepository.find({ where: { author: admin } });
        });
    }
    getCategoryByKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.findOne({ where: { key }, relations: ['blogs', 'author'] });
        });
    }
};
CategoryService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map