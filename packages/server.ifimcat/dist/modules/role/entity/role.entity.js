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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/abstract.entity");
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../../user/entity/user.entity");
let Role = class Role extends abstract_entity_1.AbstractEntity {
};
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: "bigint", default: 1 }),
    graphql_1.Field(),
    __metadata("design:type", Number)
], Role.prototype, "weight", void 0);
__decorate([
    graphql_1.Field(() => [user_entity_1.User], { nullable: 'items' }),
    typeorm_1.OneToMany(() => user_entity_1.User, user => user.role),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
Role = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity('roles')
], Role);
exports.Role = Role;
//# sourceMappingURL=role.entity.js.map