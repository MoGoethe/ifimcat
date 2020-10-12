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
const userRoles_constants_1 = require("../../constants/userRoles.constants");
let BlogService = class BlogService {
    constructor(blogRepository, tagRepository) {
        this.blogRepository = blogRepository;
        this.tagRepository = tagRepository;
    }
    hello() {
        console.log(this.tagRepository);
        return 'world';
    }
    getBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.blogRepository.find({ relations: ['author', 'topic', 'category', 'tags'] });
        });
    }
    createBlog(author, createBlogInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, body, category, topic, tags } = createBlogInput;
            const _category = yield category_entity_1.Category.findOneOrFail(category);
            const _topic = yield topic_entity_1.Topic.findOneOrFail(topic);
            const _tags = yield tag_entity_1.Tag.findByIds(tags, { relations: ['blogs'] });
            const blog = yield this.blogRepository.create({
                title,
                description,
                draft: body,
                body,
                category: _category,
                topic: _topic,
                tags: _tags,
                author
            });
            const result = yield blog.save();
            _tags.map((tag) => __awaiter(this, void 0, void 0, function* () {
                tag.blogs.push(result);
                yield this.tagRepository.save(tag);
            }));
            return result;
        });
    }
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogRepository.findOne(id, { relations: ['tags'] });
            if (!blog) {
                throw new common_1.NotFoundException("该内容不存在");
            }
            blog.tags.map((tag) => __awaiter(this, void 0, void 0, function* () {
                const tagBlogs = tag.blogs.filter(item => item.id != blog.id);
                tag.blogs = tagBlogs;
                yield this.tagRepository.save(tag);
            }));
            return this.blogRepository.remove(blog);
        });
    }
    updateBlog(author, updateBlogInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogRepository.findOne(updateBlogInput.id, { where: { author }, relations: ['tags', 'topic', 'category'] });
            if (!blog) {
                throw new common_1.NotFoundException("该内容不存在");
            }
            const _blog = yield this.blogRepository.findOne({ where: { title: updateBlogInput.title } });
            if (_blog && (_blog.id != blog.id)) {
                throw new common_1.NotFoundException("此标题已存在，请使用其他标题。");
            }
            const { title, description, body, glance, awesome, is_show, draft } = updateBlogInput;
            if (title)
                blog.title = title;
            if (description)
                blog.description = description;
            if (body)
                blog.body = body;
            if (draft)
                blog.draft = draft;
            if (glance)
                blog.glance = glance;
            if (awesome)
                blog.awesome = awesome;
            if (is_show !== undefined)
                blog.is_show = is_show;
            if (updateBlogInput.tags) {
                const tags = yield tag_entity_1.Tag.findByIds(updateBlogInput.tags);
                const originTagIds = blog.tags.map(oTag => oTag.id);
                const restultTagIds = [...originTagIds, ...updateBlogInput.tags].filter((item, index, self) => {
                    return self.indexOf(item) == index;
                });
                if (!tags.length) {
                    throw new common_1.NotFoundException("该博客至少需要一个标签");
                }
                const resultTags = yield tag_entity_1.Tag.findByIds(restultTagIds, { relations: ['blogs'] });
                resultTags.map((rTag) => __awaiter(this, void 0, void 0, function* () {
                    const tagBlogIndex = rTag.blogs.findIndex(item => item.id === blog.id);
                    if (tagBlogIndex === -1) {
                        rTag.blogs.push(blog);
                    }
                    else {
                        rTag.blogs.splice(tagBlogIndex, 1);
                    }
                    yield this.tagRepository.save(rTag);
                }));
                blog.tags = tags;
            }
            if (updateBlogInput.topic) {
                const topic = yield topic_entity_1.Topic.findOne({ id: updateBlogInput.topic });
                if (!topic) {
                    throw new common_1.NotFoundException("该专题不存在");
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
            yield this.blogRepository.save(blog);
            return this.blogRepository.findOne({ id: updateBlogInput.id }, { relations: ['author', 'topic', 'category', 'tags'] });
        });
    }
    naUpdateBlog(naUpdateBlogInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogRepository.findOne(naUpdateBlogInput.id, { relations: ['tags', 'topic', 'category'] });
            if (!blog) {
                throw new common_1.NotFoundException("该内容不存在");
            }
            const { glance, awesome } = naUpdateBlogInput;
            if (glance)
                blog.glance = glance;
            if (awesome)
                blog.awesome = awesome;
            yield this.blogRepository.save(blog);
            return this.blogRepository.findOne({ id: naUpdateBlogInput.id }, { relations: ['author', 'topic', 'category', 'tags'] });
        });
    }
    getAdminBlogs(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            if (admin.roles.includes(userRoles_constants_1.UserRoleType.ADMIN)) {
                return this.blogRepository.find({ relations: ['author', 'topic', 'category', 'tags'] });
            }
            return this.blogRepository.find({ where: { author: admin }, relations: ['author', 'topic', 'category', 'tags'] });
        });
    }
    getBlogByKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogRepository.findOne({ key }, { relations: ['author', 'topic', 'category', 'tags'] });
            if (blog) {
                return blog;
            }
            return null;
        });
    }
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blogRepository.findOne(id, { relations: ['author', 'topic', 'category', 'tags'] });
        });
    }
    getBlogByKeywords(keywrods) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blogRepository.createQueryBuilder("blog")
                .where("blog.title LIKE :keywrods")
                .setParameters({
                keywrods: '%' + keywrods + '%'
            })
                .orderBy("blog.id", "ASC")
                .getMany();
        });
    }
};
BlogService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(blog_entity_1.Blog)),
    __param(1, typeorm_1.InjectRepository(tag_entity_1.Tag)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map