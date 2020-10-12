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
exports.GetTagsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const tag_service_1 = require("../tag.service");
const tag_entity_1 = require("../entity/tag.entity");
let GetTagsResolver = class GetTagsResolver {
    constructor(tagService) {
        this.tagService = tagService;
    }
    getTags() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tagService.getTags();
        });
    }
    getTag(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tagService.getTagByKey(key);
        });
    }
};
__decorate([
    graphql_1.Query(() => [tag_entity_1.Tag], { nullable: 'itemsAndList' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GetTagsResolver.prototype, "getTags", null);
__decorate([
    graphql_1.Query(() => tag_entity_1.Tag),
    __param(0, graphql_1.Args('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GetTagsResolver.prototype, "getTag", null);
GetTagsResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], GetTagsResolver);
exports.GetTagsResolver = GetTagsResolver;
//# sourceMappingURL=GetTags.resolver.js.map