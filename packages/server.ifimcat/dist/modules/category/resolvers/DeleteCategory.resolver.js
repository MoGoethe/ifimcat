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
exports.DeleteCategoryResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const category_entity_1 = require("../entity/category.entity");
const category_service_1 = require("../category.service");
const auth_guard_1 = require("../../../auth/auth.guard");
const common_1 = require("@nestjs/common");
const userRoles_constants_1 = require("../../../constants/userRoles.constants");
let DeleteCategoryResolver = class DeleteCategoryResolver {
    constructor(cageoryService) {
        this.cageoryService = cageoryService;
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cageoryService.deleteCategory(id);
        });
    }
};
__decorate([
    common_1.UseGuards(new auth_guard_1.GQLAuthGuard(userRoles_constants_1.UserRoleType.ADMIN)),
    graphql_1.Mutation(() => category_entity_1.Category),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DeleteCategoryResolver.prototype, "deleteCategory", null);
DeleteCategoryResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], DeleteCategoryResolver);
exports.DeleteCategoryResolver = DeleteCategoryResolver;
//# sourceMappingURL=DeleteCategory.resolver.js.map