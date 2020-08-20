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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_entity_1 = require("./entity/user.entity");
const typeorm_2 = require("typeorm");
const sendEmail_1 = require("../../utils/sendEmail");
const createConfirmationUrl_1 = require("../../utils/createConfirmationUrl");
const redis_1 = require("../../redis");
const redisPrefixes_1 = require("../../constants/redisPrefixes");
const userRoles_constants_1 = require("../../constants/userRoles.constants");
const config_1 = __importDefault(require("../../config"));
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.__initSuperAdmin();
    }
    hello() {
        return 'world';
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.create(Object.assign({}, data));
            yield sendEmail_1.sendMail(data.email, createConfirmationUrl_1.createConfirmationUrl(user.id));
            yield this.userRepository.save(user);
            return user;
        });
    }
    login(loginInput, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginInput;
            const user = yield user_entity_1.User.findOne({ where: { email: email } });
            if (!user) {
                throw new common_1.UnauthorizedException('用户不存在');
            }
            if (user.forbid) {
                throw new common_1.UnauthorizedException('用户已被禁用，请联系管理员');
            }
            const valid = yield bcryptjs_1.default.compare(password, user.password);
            if (!valid) {
                throw new common_1.UnauthorizedException('密码错误');
            }
            req.session.userId = user.id;
            return user;
        });
    }
    logout(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                ctx.req.session.destroy(err => {
                    if (err) {
                        return reject(false);
                    }
                    return resolve(true);
                });
            });
        });
    }
    confirmUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield redis_1.redis.get(redisPrefixes_1.confirmationPrefix + token);
            if (!userId) {
                return false;
            }
            yield user_entity_1.User.update({ id: parseInt(userId) }, { confirmed: true });
            redis_1.redis.del(redisPrefixes_1.confirmationPrefix + token);
            return true;
        });
    }
    currentUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = ctx.req.session;
            if (!userId) {
                return null;
            }
            return yield user_entity_1.User.findOneOrFail({ id: userId }, { relations: ['blogs', 'topics', 'categories'] });
        });
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.User.findOne({ where: { email } });
            if (!user) {
                return false;
            }
            yield sendEmail_1.sendMail(user.email, createConfirmationUrl_1.createForgotPasswordUrl(user.id));
            return true;
        });
    }
    changePassword({ password, token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield redis_1.redis.get(redisPrefixes_1.forgotPasswordPrefix + token);
            console.log(userId);
            if (!userId) {
                return null;
            }
            const user = yield user_entity_1.User.findOne(userId);
            if (!user) {
                return null;
            }
            user.password = yield bcryptjs_1.default.hash(password, 10);
            yield redis_1.redis.del(redisPrefixes_1.forgotPasswordPrefix + token);
            yield user.save();
            return user;
        });
    }
    updateUser({ userId, username, roles, forbid }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.User.findOne(userId);
            if (!user) {
                return null;
            }
            if (roles) {
                user.roles = roles;
            }
            if (username) {
                user.username = username;
            }
            if (forbid !== undefined) {
                user.forbid = forbid;
            }
            yield user.save();
            return user;
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.find({ relations: ['blogs', 'topics', 'categories'] });
        });
    }
    __initSuperAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = config_1.default.admin;
            const _adminUser = yield user_entity_1.User.findOne({ where: { username, email } });
            if (!_adminUser) {
                const _newAdminUser = {};
                _newAdminUser.username = username;
                _newAdminUser.password = yield bcryptjs_1.default.hash(password, 10);
                _newAdminUser.email = email;
                _newAdminUser.roles = [userRoles_constants_1.UserRoleType.GHOST, userRoles_constants_1.UserRoleType.EDITOR, userRoles_constants_1.UserRoleType.PUBLISH, userRoles_constants_1.UserRoleType.ADMIN];
                _newAdminUser.confirmed = true;
                yield user_entity_1.User.insert(_newAdminUser);
            }
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
;
//# sourceMappingURL=user.service.js.map