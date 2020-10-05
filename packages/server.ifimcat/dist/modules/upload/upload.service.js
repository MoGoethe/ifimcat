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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const checksumFile_1 = require("../../utils/checksumFile");
const mkdir_1 = __importDefault(require("../../utils/mkdir"));
const config_1 = __importStar(require("../../config"));
let UploadService = class UploadService {
    fileUpload({ filename, createReadStream, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const ext = filename.match(/\.[a-z]+$/);
            const md5Filename = yield checksumFile_1.checksumFile('md5', createReadStream);
            const dir = path_1.default.join(__dirname, "/../../../assets/upload");
            const filePath = `${dir}/${md5Filename}${ext}`;
            yield mkdir_1.default(dir);
            const address = config_1.isProductionEnvironment ? `http://${config_1.default.host}` : `http://${config_1.default.host}:${config_1.default.port}`;
            return new Promise((resolve, reject) => {
                createReadStream()
                    .pipe(fs_1.createWriteStream(filePath))
                    .on('finish', () => resolve(`${address}/assets/upload/${md5Filename}${ext}`))
                    .on('error', () => reject(false));
            });
        });
    }
};
UploadService = __decorate([
    common_1.Injectable()
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map