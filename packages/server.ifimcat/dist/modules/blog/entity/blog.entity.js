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
exports.Blog = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const abstract_entity_1 = require("../../../shared/abstract.entity");
const user_entity_1 = require("../../user/entity/user.entity");
const tag_entity_1 = require("../../tag/entity/tag.entity");
const category_entity_1 = require("../../category/entity/category.entity");
const topic_entity_1 = require("../../topic/entity/topic.entity");
const IsTitleAlreadyExist_1 = require("../decorator/IsTitleAlreadyExist");
let Blog = class Blog extends abstract_entity_1.AbstractEntity {
};
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(() => String),
    IsTitleAlreadyExist_1.IsTitleAlreadyExist({ message: "此标题已存在" }),
    __metadata("design:type", String)
], Blog.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Blog.prototype, "description", void 0);
__decorate([
    typeorm_1.Column("text"),
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Blog.prototype, "body", void 0);
__decorate([
    typeorm_1.Column("text"),
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Blog.prototype, "draft", void 0);
__decorate([
    graphql_1.Field(() => [tag_entity_1.Tag], { nullable: 'itemsAndList' }),
    typeorm_1.ManyToMany(() => tag_entity_1.Tag, { eager: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Blog.prototype, "tags", void 0);
__decorate([
    graphql_1.Field(() => category_entity_1.Category),
    typeorm_1.ManyToOne(() => category_entity_1.Category, category => category.blogs, { eager: true }),
    __metadata("design:type", category_entity_1.Category)
], Blog.prototype, "category", void 0);
__decorate([
    graphql_1.Field(() => topic_entity_1.Topic, { nullable: true }),
    typeorm_1.ManyToOne(() => topic_entity_1.Topic, topic => topic.blogs, { eager: true }),
    __metadata("design:type", Object)
], Blog.prototype, "topic", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Blog.prototype, "glance", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Blog.prototype, "awesome", void 0);
__decorate([
    graphql_1.Field(() => user_entity_1.User),
    typeorm_1.ManyToOne(() => user_entity_1.User, user => user.blogs, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], Blog.prototype, "author", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], Blog.prototype, "is_show", void 0);
Blog = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity('blogs')
], Blog);
exports.Blog = Blog;
//# sourceMappingURL=blog.entity.js.map