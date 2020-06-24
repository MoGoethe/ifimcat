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
exports.AbstractEntity = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const uuid_1 = require("uuid");
let AbstractEntity = class AbstractEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], AbstractEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { default: uuid_1.v4() }),
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], AbstractEntity.prototype, "key", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    graphql_1.Field(),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "createAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    graphql_1.Field(),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "updateAt", void 0);
AbstractEntity = __decorate([
    typeorm_1.Entity(),
    graphql_1.ObjectType()
], AbstractEntity);
exports.AbstractEntity = AbstractEntity;
//# sourceMappingURL=abstract.entity.js.map