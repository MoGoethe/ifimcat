"use strict";
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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getStat(path) {
    return new Promise((resolve) => {
        fs_1.default.stat(path, (err, stats) => {
            if (err) {
                resolve(false);
            }
            else {
                resolve(stats);
            }
        });
    });
}
function mkdir(dir) {
    return new Promise((resolve) => {
        fs_1.default.mkdir(dir, err => {
            if (err) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
}
function dirExists(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        let isExists = yield getStat(dir);
        if (isExists && isExists.isDirectory()) {
            return true;
        }
        else if (isExists) {
            return false;
        }
        let tempDir = path_1.default.parse(dir).dir;
        let status = yield dirExists(tempDir);
        let mkdirStatus;
        if (status) {
            mkdirStatus = yield mkdir(dir);
        }
        return mkdirStatus;
    });
}
exports.default = dirExists;
//# sourceMappingURL=mkdir.js.map