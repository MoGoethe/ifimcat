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
exports.GQLAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../modules/user/entity/user.entity");
const userRoles_constants_1 = require("../constants/userRoles.constants");
let GQLAuthGuard = class GQLAuthGuard {
    constructor(role = userRoles_constants_1.UserRoleType.GHOST) {
        this.role = role;
    }
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const ctx = graphql_1.GqlExecutionContext.create(context);
            const { session } = ctx.getContext().req;
            if (session && session.userId) {
                const user = yield user_entity_1.User.findOne({ id: session.userId });
                if (!user) {
                    throw new common_1.UnauthorizedException('用户不存在');
                }
                if (user.roles.indexOf(this.role) === -1) {
                    throw new common_1.UnauthorizedException('权限不足');
                }
            }
            return true;
        });
    }
};
GQLAuthGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [String])
], GQLAuthGuard);
exports.GQLAuthGuard = GQLAuthGuard;
//# sourceMappingURL=auth.guard.js.map