"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProductionEnvironment = exports.isTestEnvironment = void 0;
require("dotenv/config");
exports.isTestEnvironment = process.env.NODE_ENV === "test";
exports.isProductionEnvironment = process.env.NODE_ENV === "production";
exports.default = {
    environment: process.env.NODE_ENV || "development",
    host: process.env.APP_HOST || "127.0.0.1",
    port: (exports.isTestEnvironment ? process.env.TEST_APP_PORT : process.env.APP_PORT) || "6001",
    auth: {
        secretKey: process.env.JWT_SECRET_KEY || "J12H3JH213BJ217C5C7ZCA",
        sessionSecretKey: process.env.SESSION_SECRET || "JEWV0E5DUY89NQVPAFGP",
    },
    typeorm: {
        db: {
            host: process.env.DB_HOST || "localhost",
            type: process.env.DB_TYPE || "mysql",
            port: process.env.DB_PORT || 3306,
            username: process.env.DB_USERNAME || "root",
            password: process.env.DB_PASSWORD || "123456789",
            database: (exports.isTestEnvironment ? process.env.TEST_DB_NAME : process.env.DB_NAME) || "ifimcat_dev",
            extra: {
                "charset": "utf8mb4_unicode_ci"
            }
        },
        synchronize: !exports.isProductionEnvironment,
        logging: !exports.isProductionEnvironment
    },
    logging: {
        dir: process.env.LOGGING_DIR || "logs",
        level: process.env.LOGGING_LEVEL || "debug"
    },
    cors: {
        origin: [
            "http://localhost:8007",
            "http://admin.ifimcat.com",
            "https://admin.ifimcat.com",
            "http://ifimcat.com",
            "https://ifimcat.com",
        ],
        methods: ["POST", "GET", "PUT", "DELETE", "HEAD", "PATCH"],
        credentials: true
    },
    admin: {
        email: process.env.ADMIN_EMAIL || 'admin@qq.com',
        password: process.env.ADMIN_PASSWORD || 'admin',
        username: process.env.ADMIN_USERNAME || 'admin',
    }
};
//# sourceMappingURL=index.js.map