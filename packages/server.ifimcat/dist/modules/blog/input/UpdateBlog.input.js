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
exports.UpdateBlogInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const IsNameAlreadyExist_1 = require("../../topic/decorator/IsNameAlreadyExist");
let UpdateBlogInput = class UpdateBlogInput {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateBlogInput.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MinLength(2),
    class_validator_1.MaxLength(24),
    IsNameAlreadyExist_1.IsNameAlreadyExist({ message: "此标题已存在" }),
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateBlogInput.prototype, "title", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MinLength(8),
    class_validator_1.MaxLength(128),
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateBlogInput.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MinLength(64),
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateBlogInput.prototype, "body", void 0);
__decorate([
    graphql_1.Field(() => [graphql_1.Int], { nullable: true }),
    __metadata("design:type", Array)
], UpdateBlogInput.prototype, "tags", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateBlogInput.prototype, "category", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateBlogInput.prototype, "topic", void 0);
__decorate([
    class_validator_1.Min(0),
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateBlogInput.prototype, "glance", void 0);
__decorate([
    class_validator_1.Min(0),
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateBlogInput.prototype, "awesome", void 0);
__decorate([
    graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], UpdateBlogInput.prototype, "is_show", void 0);
UpdateBlogInput = __decorate([
    graphql_1.InputType('UpdateBlogInput')
], UpdateBlogInput);
exports.UpdateBlogInput = UpdateBlogInput;
//# sourceMappingURL=UpdateBlog.input.js.map