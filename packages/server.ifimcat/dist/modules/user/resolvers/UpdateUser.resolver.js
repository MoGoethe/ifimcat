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
exports.UpdateUserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../entity/user.entity");
const user_service_1 = require("../user.service");
const updateUser_input_1 = require("../input/updateUser.input");
const userRoles_constants_1 = require("../../../constants/userRoles.constants");
const auth_guard_1 = require("../../../auth/auth.guard");
const common_1 = require("@nestjs/common");
let UpdateUserResolver = class UpdateUserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    updateUser(updateUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.updateUser(updateUserData);
        });
    }
};
__decorate([
    graphql_1.Mutation(() => user_entity_1.User, { nullable: true }),
    common_1.UseGuards(new auth_guard_1.GQLAuthGuard(userRoles_constants_1.UserRoleType.ADMIN)),
    __param(0, graphql_1.Args('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateUser_input_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UpdateUserResolver.prototype, "updateUser", null);
UpdateUserResolver = __decorate([
    graphql_1.Resolver(user_entity_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UpdateUserResolver);
exports.UpdateUserResolver = UpdateUserResolver;
//# sourceMappingURL=UpdateUser.resolver.js.map