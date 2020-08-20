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
exports.TopicService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const topic_entity_1 = require("./entity/topic.entity");
let TopicService = class TopicService {
    constructor(topicRepository) {
        this.topicRepository = topicRepository;
    }
    hello() {
        return 'hello world!';
    }
    getTopics() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.topicRepository.find({ relations: ['author', 'blogs'] });
        });
    }
    createTopic(author, createTopicInput) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.topicRepository.create(Object.assign(Object.assign({}, createTopicInput), { author })).save();
        });
    }
    updateTopic(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const topic = yield this.topicRepository.findOne(id);
            if (!topic) {
                throw new common_1.NotFoundException("修改失败，内容不存在");
            }
            topic.name = name;
            return this.topicRepository.save(topic);
        });
    }
    deleteTopic(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const topic = yield this.topicRepository.findOne(id);
            if (!topic) {
                throw new common_1.NotFoundException("删除失败，内容不存在");
            }
            return this.topicRepository.remove(topic);
        });
    }
};
TopicService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(topic_entity_1.Topic)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TopicService);
exports.TopicService = TopicService;
//# sourceMappingURL=topic.service.js.map