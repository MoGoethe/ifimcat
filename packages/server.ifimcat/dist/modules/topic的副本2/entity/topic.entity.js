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
exports.Topic = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const abstract_entity_1 = require("../../../shared/abstract.entity");
const user_entity_1 = require("../../user/entity/user.entity");
let Topic = class Topic extends abstract_entity_1.AbstractEntity {
};
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(() => String),
    typeorm_1.Index({ unique: true }),
    __metadata("design:type", String)
], Topic.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => user_entity_1.User),
    typeorm_1.ManyToOne(() => user_entity_1.User, user => user.topics, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], Topic.prototype, "author", void 0);
Topic = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity('topics')
], Topic);
exports.Topic = Topic;
//# sourceMappingURL=topic.entity.js.map