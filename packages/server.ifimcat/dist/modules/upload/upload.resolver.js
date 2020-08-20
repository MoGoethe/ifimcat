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
exports.UploadResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const upload_service_1 = require("./upload.service");
const graphql_upload_1 = require("graphql-upload");
let UploadResolver = class UploadResolver {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    fileUpload(file) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(file);
            return this.uploadService.fileUpload(file);
        });
    }
};
__decorate([
    graphql_1.Mutation(() => String),
    __param(0, graphql_1.Args({ name: 'file', type: () => graphql_upload_1.GraphQLUpload })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadResolver.prototype, "fileUpload", null);
UploadResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadResolver);
exports.UploadResolver = UploadResolver;
//# sourceMappingURL=upload.resolver.js.map