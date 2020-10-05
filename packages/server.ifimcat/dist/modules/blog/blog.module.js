"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModule = void 0;
const common_1 = require("@nestjs/common");
const blog_controller_1 = require("./blog.controller");
const blog_service_1 = require("./blog.service");
const typeorm_1 = require("@nestjs/typeorm");
const blog_entity_1 = require("./entity/blog.entity");
const tag_entity_1 = require("../tag/entity/tag.entity");
const resolvers_1 = require("./resolvers");
let BlogModule = class BlogModule {
};
BlogModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([blog_entity_1.Blog, tag_entity_1.Tag])],
        controllers: [blog_controller_1.BlogController],
        providers: [
            blog_service_1.BlogService,
            resolvers_1.GetBlogsResolver,
            resolvers_1.CreateBlogResolver,
            resolvers_1.DeleteBlogResolver,
            resolvers_1.UpdateBlogResolver,
        ],
    })
], BlogModule);
exports.BlogModule = BlogModule;
//# sourceMappingURL=blog.module.js.map