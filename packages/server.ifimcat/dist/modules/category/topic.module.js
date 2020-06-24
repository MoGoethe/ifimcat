"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicModule = void 0;
const common_1 = require("@nestjs/common");
const topic_controller_1 = require("./topic.controller");
const topic_service_1 = require("./topic.service");
const typeorm_1 = require("@nestjs/typeorm");
const topic_entity_1 = require("./entity/topic.entity");
const resolvers_1 = require("./resolvers");
let TopicModule = class TopicModule {
};
TopicModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([topic_entity_1.Topic])],
        controllers: [topic_controller_1.TopicController],
        providers: [
            topic_service_1.TopicService,
            resolvers_1.GetTopicsResolver,
            resolvers_1.CreateTopicResolver,
            resolvers_1.UpdateTopicResolver,
            resolvers_1.DeleteTopicResolver,
        ],
    })
], TopicModule);
exports.TopicModule = TopicModule;
//# sourceMappingURL=topic.module.js.map