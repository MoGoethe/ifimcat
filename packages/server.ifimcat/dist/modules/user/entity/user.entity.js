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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const abstract_entity_1 = require("../../../shared/abstract.entity");
const userRoles_constants_1 = require("../../../constants/userRoles.constants");
const blog_entity_1 = require("../../blog/entity/blog.entity");
const topic_entity_1 = require("../../topic/entity/topic.entity");
const category_entity_1 = require("../../category/entity/category.entity");
const tag_entity_1 = require("../../tag/entity/tag.entity");
let User = class User extends abstract_entity_1.AbstractEntity {
    hashPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            this.password = yield bcryptjs_1.default.hash(this.password, 10);
        });
    }
};
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(() => String),
    typeorm_1.Index({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: 'items' }),
    typeorm_1.Column({
        type: 'set',
        enum: userRoles_constants_1.UserRoleType,
        default: [userRoles_constants_1.UserRoleType.GHOST]
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    graphql_1.Field(() => Boolean),
    typeorm_1.Column('bool', { default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "confirmed", void 0);
__decorate([
    graphql_1.Field(() => [blog_entity_1.Blog], { nullable: 'itemsAndList' }),
    typeorm_1.OneToMany(() => blog_entity_1.Blog, blog => blog.author),
    __metadata("design:type", Array)
], User.prototype, "blogs", void 0);
__decorate([
    graphql_1.Field(() => [topic_entity_1.Topic], { nullable: 'itemsAndList' }),
    typeorm_1.OneToMany(() => topic_entity_1.Topic, topic => topic.author),
    __metadata("design:type", Array)
], User.prototype, "topics", void 0);
__decorate([
    graphql_1.Field(() => [category_entity_1.Category], { nullable: 'itemsAndList' }),
    typeorm_1.OneToMany(() => category_entity_1.Category, category => category.author),
    __metadata("design:type", Array)
], User.prototype, "categories", void 0);
__decorate([
    graphql_1.Field(() => [tag_entity_1.Tag], { nullable: 'itemsAndList' }),
    typeorm_1.OneToMany(() => tag_entity_1.Tag, tag => tag.author),
    __metadata("design:type", Array)
], User.prototype, "tags", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
User = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity('users')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map