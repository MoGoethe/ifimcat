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
exports.CreateTagInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const IsNameAlreadyExist_1 = require("../decorator/IsNameAlreadyExist");
let CreateTagInput = class CreateTagInput {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field(),
    IsNameAlreadyExist_1.IsNameAlreadyExist({ message: "此名称已存在" }),
    __metadata("design:type", String)
], CreateTagInput.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateTagInput.prototype, "slogan", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateTagInput.prototype, "description", void 0);
CreateTagInput = __decorate([
    graphql_1.InputType()
], CreateTagInput);
exports.CreateTagInput = CreateTagInput;
//# sourceMappingURL=createTag.input copy.js.map