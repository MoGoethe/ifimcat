"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const typeorm_1 = require("@nestjs/typeorm");
const resolvers_1 = require("./resolvers");
const user_entity_1 = require("./entity/user.entity");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])],
        controllers: [user_controller_1.UserController],
        providers: [
            user_service_1.UserService,
            resolvers_1.RegisterResolver,
            resolvers_1.LoginResolver,
            resolvers_1.LogoutResolver,
            resolvers_1.ConfirmUserResolver,
            resolvers_1.CurrentUserResolver,
            resolvers_1.ChangePasswordResolver,
            resolvers_1.ForgetPasswordResolver,
            resolvers_1.GetUsersResolver,
            resolvers_1.UpdateUserResolver,
        ],
    })
], UserModule);
exports.UserModule = UserModule;
;
//# sourceMappingURL=user.module.js.map