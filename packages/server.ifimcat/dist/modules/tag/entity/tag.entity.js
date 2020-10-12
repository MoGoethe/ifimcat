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
exports.Tag = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const abstract_entity_1 = require("../../../shared/abstract.entity");
const user_entity_1 = require("../../user/entity/user.entity");
const blog_entity_1 = require("../../blog/entity/blog.entity");
let Tag = class Tag extends abstract_entity_1.AbstractEntity {
};
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(() => String),
    typeorm_1.Index({ unique: true }),
    __metadata("design:type", String)
], Tag.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Tag.prototype, "slogan", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Tag.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Tag.prototype, "glance", void 0);
__decorate([
    graphql_1.Field(() => user_entity_1.User),
    typeorm_1.ManyToOne(() => user_entity_1.User, user => user.tags),
    __metadata("design:type", user_entity_1.User)
], Tag.prototype, "author", void 0);
__decorate([
    graphql_1.Field(() => [blog_entity_1.Blog], { nullable: 'itemsAndList' }),
    typeorm_1.ManyToMany(() => blog_entity_1.Blog, { onDelete: "CASCADE" }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Tag.prototype, "blogs", void 0);
Tag = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity('tags')
], Tag);
exports.Tag = Tag;
//# sourceMappingURL=tag.entity.js.map