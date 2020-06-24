"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForgotPasswordUrl = exports.createConfirmationUrl = void 0;
const uuid_1 = require("uuid");
const redis_1 = require("../redis");
const redisPrefixes_1 = require("../constants/redisPrefixes");
exports.createConfirmationUrl = (userId) => {
    const token = uuid_1.v4();
    redis_1.redis.set(redisPrefixes_1.confirmationPrefix + token, userId, 'ex', 60 * 60 * 24);
    return `http://lcoalhost:4000/user/confirm/${token}`;
};
exports.createForgotPasswordUrl = (userId) => {
    const token = uuid_1.v4();
    redis_1.redis.set(redisPrefixes_1.forgotPasswordPrefix + token, userId, 'ex', 60 * 60 * 24);
    return `http://lcoalhost:4000/user/forgot-password/${token}`;
};
//# sourceMappingURL=createConfirmationUrl.js.map