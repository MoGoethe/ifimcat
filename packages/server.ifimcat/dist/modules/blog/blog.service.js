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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const blog_entity_1 = require("./entity/blog.entity");
const typeorm_2 = require("typeorm");
const tag_entity_1 = require("../tag/entity/tag.entity");
const topic_entity_1 = require("../topic/entity/topic.entity");
const category_entity_1 = require("../category/entity/category.entity");
let BlogService = class BlogService {
    constructor(blogRepository) {
        this.blogRepository = blogRepository;
    }
    hello() {
        return 'world';
    }
    getBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.blogRepository.find();
        });
    }
    createBlog(author, createBlogInput) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.blogRepository.create(Object.assign(Object.assign({}, createBlogInput), { author })).save();
        });
    }
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogRepository.findOne(id);
            if (!blog) {
                throw new common_1.NotFoundException("该内容不存在");
            }
            return this.blogRepository.remove(blog);
        });
    }
    updateBlog(author, updateBlogInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogRepository.findOne(updateBlogInput.id, { where: { author } });
            const { title, description, body, glance, awesome, is_show } = updateBlogInput;
            if (!blog) {
                throw new common_1.NotFoundException("该内容不存在");
            }
            if (title)
                blog.title = title;
            if (description)
                blog.description = description;
            if (body)
                blog.body = body;
            if (glance)
                blog.glance = glance;
            if (awesome)
                blog.awesome = awesome;
            blog.is_show = is_show;
            if (updateBlogInput.tags) {
                const tags = yield tag_entity_1.Tag.findByIds([updateBlogInput.tags]);
                if (!tags.length) {
                    throw new common_1.NotFoundException("该博客至少需要一个标签");
                }
                blog.tags = tags;
            }
            if (updateBlogInput.topic) {
                const topic = yield topic_entity_1.Topic.findOne({ id: updateBlogInput.topic });
                if (!topic) {
                    throw new common_1.NotFoundException("该话题不存在");
                }
                blog.topic = topic;
            }
            if (updateBlogInput.category) {
                const category = yield category_entity_1.Category.findOne({ id: updateBlogInput.category });
                if (!category) {
                    throw new common_1.NotFoundException("该类别不存在");
                }
                blog.category = category;
            }
            return this.blogRepository.save(blog);
        });
    }
};
BlogService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(blog_entity_1.Blog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map