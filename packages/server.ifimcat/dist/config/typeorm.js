"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const _1 = __importDefault(require("./"));
const { type, host, port, username, password, database } = _1.default.typeorm.db;
const { synchronize, logging } = _1.default.typeorm;
exports.typeOrmConfig = {
    type,
    host,
    port,
    username,
    password,
    database,
    synchronize,
    logging,
    autoLoadEntities: true,
};
//# sourceMappingURL=typeorm.js.map