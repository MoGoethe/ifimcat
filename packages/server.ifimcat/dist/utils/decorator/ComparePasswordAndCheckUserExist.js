"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
let ComparePasswordAndCheckUserExistConstraint = class ComparePasswordAndCheckUserExistConstraint {
    validate(password, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const [relatedPropertyName] = args.constraints;
            const username = args.object[relatedPropertyName];
            const user = yield user_entity_1.User.findOne({ username });
            if (user) {
                const match = yield bcrypt_1.default.compare(password, user.password);
                if (match)
                    return true;
                return false;
            }
            return false;
        });
    }
};
ComparePasswordAndCheckUserExistConstraint = __decorate([
    class_validator_1.ValidatorConstraint({ async: true })
], ComparePasswordAndCheckUserExistConstraint);
exports.ComparePasswordAndCheckUserExistConstraint = ComparePasswordAndCheckUserExistConstraint;
function ComparePasswordAndCheckUserExist(property, validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: ComparePasswordAndCheckUserExistConstraint
        });
    };
}
exports.ComparePasswordAndCheckUserExist = ComparePasswordAndCheckUserExist;
//# sourceMappingURL=ComparePasswordAndCheckUserExist.js.map