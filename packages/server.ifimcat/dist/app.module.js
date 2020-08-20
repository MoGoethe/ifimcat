"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const serve_static_1 = require("@nestjs/serve-static");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_session_1 = require("nestjs-session");
const express_session_1 = __importDefault(require("express-session"));
const path_1 = require("path");
const connect_redis_1 = __importDefault(require("connect-redis"));
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_2 = require("./config/typeorm");
const user_module_1 = require("./modules/user/user.module");
const config_1 = __importStar(require("./config"));
const redis_1 = require("./redis");
const topic_module_1 = require("./modules/topic/topic.module");
const blog_module_1 = require("./modules/blog/blog.module");
const category_module_1 = require("./modules/category/category.module");
const tag_module_1 = require("./modules/tag/tag.module");
const upload_module_1 = require("./modules/upload/upload.module");
const RedisStore = connect_redis_1.default(express_session_1.default);
console.log(path_1.join(__dirname, '../dist/', 'client'));
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            tag_module_1.TagModule,
            category_module_1.CategoryModule,
            blog_module_1.BlogModule,
            user_module_1.UserModule,
            topic_module_1.TopicModule,
            upload_module_1.UploadModule,
            nestjs_session_1.SessionModule.forRoot({
                session: {
                    store: new RedisStore({
                        client: redis_1.redis,
                    }),
                    name: 'pid',
                    secret: config_1.default.auth.sessionSecretKey,
                    resave: false,
                    saveUninitialized: false,
                    cookie: {
                        httpOnly: true,
                        secure: config_1.isProductionEnvironment,
                        maxAge: 1000 * 60 * 60 * 24,
                    },
                }
            }),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: 'schema.gql',
                context: ({ req, res }) => ({ req, res }),
                uploads: {
                    maxFileSize: 1000000000,
                    maxFiles: 10,
                },
                cors: config_1.default.cors,
            }),
            typeorm_1.TypeOrmModule.forRoot(typeorm_2.typeOrmConfig),
            serve_static_1.ServeStaticModule.forRoot({ rootPath: path_1.join(__dirname, '../dist/', 'client') }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map