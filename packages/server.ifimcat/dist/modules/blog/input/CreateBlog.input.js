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
exports.CreateBlogInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const IsTitleAlreadyExist_1 = require("../decorator/IsTitleAlreadyExist");
let CreateBlogInput = class CreateBlogInput {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MinLength(2),
    class_validator_1.MaxLength(24),
    IsTitleAlreadyExist_1.IsTitleAlreadyExist({ message: "此标题已存在" }),
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], CreateBlogInput.prototype, "title", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MinLength(8),
    class_validator_1.MaxLength(128),
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], CreateBlogInput.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MinLength(64),
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], CreateBlogInput.prototype, "body", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], CreateBlogInput.prototype, "category", void 0);
__decorate([
    graphql_1.Field(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], CreateBlogInput.prototype, "topic", void 0);
__decorate([
    graphql_1.Field(() => [Number], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], CreateBlogInput.prototype, "tags", void 0);
CreateBlogInput = __decorate([
    graphql_1.InputType()
], CreateBlogInput);
exports.CreateBlogInput = CreateBlogInput;
//# sourceMappingURL=CreateBlog.input.js.map