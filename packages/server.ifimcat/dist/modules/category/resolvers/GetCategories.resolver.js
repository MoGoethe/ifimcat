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
exports.GetCategoriesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const category_service_1 = require("../category.service");
const category_entity_1 = require("../entity/category.entity");
let GetCategoriesResolver = class GetCategoriesResolver {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryService.getCategories();
        });
    }
    getCategory(key) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(key, '~~--~--~--~--~--~--~--~--~--');
            return this.categoryService.getCategoryByKey(key);
        });
    }
};
__decorate([
    graphql_1.Query(() => [category_entity_1.Category], { nullable: 'itemsAndList' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GetCategoriesResolver.prototype, "getCategories", null);
__decorate([
    graphql_1.Query(() => category_entity_1.Category),
    __param(0, graphql_1.Args('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GetCategoriesResolver.prototype, "getCategory", null);
GetCategoriesResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], GetCategoriesResolver);
exports.GetCategoriesResolver = GetCategoriesResolver;
//# sourceMappingURL=GetCategories.resolver.js.map