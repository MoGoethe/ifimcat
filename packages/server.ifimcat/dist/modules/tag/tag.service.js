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
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tag_entity_1 = require("./entity/tag.entity");
let TagService = class TagService {
    constructor(tagRepository) {
        this.tagRepository = tagRepository;
    }
    hello() {
        return 'hello world!';
    }
    getTags() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tagRepository.find({ relations: ['author', 'blogs'] });
        });
    }
    createTag(author, createTagInput) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tagRepository.create(Object.assign(Object.assign({}, createTagInput), { author })).save();
        });
    }
    updateTag(updateTagInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = yield this.tagRepository.findOne(updateTagInput.id);
            if (!tag) {
                throw new common_1.NotFoundException("修改失败，内容不存在");
            }
            Object.assign(tag, updateTagInput);
            yield this.tagRepository.save(tag);
            return this.tagRepository.findOne(updateTagInput.id, { relations: ['author', 'blogs'] });
        });
    }
    deleteTag(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = yield this.tagRepository.findOne(id);
            if (!tag) {
                throw new common_1.NotFoundException("删除失败，内容不存在");
            }
            return this.tagRepository.remove(tag);
        });
    }
    getTagByKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tagRepository.findOne({ where: { key }, relations: ['blogs', 'author'] });
        });
    }
};
TagService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(tag_entity_1.Tag)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TagService);
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map