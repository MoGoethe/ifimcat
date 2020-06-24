"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checksumFile = void 0;
const crypto_1 = require("crypto");
function checksumFile(hashName, createReadStream) {
    return new Promise((resolve, reject) => {
        const hash = crypto_1.createHash(hashName);
        const stream = createReadStream();
        stream.on('error', err => reject(err));
        stream.on('data', chunk => hash.update(chunk));
        stream.on('end', () => resolve(hash.digest('hex')));
    });
}
exports.checksumFile = checksumFile;
//# sourceMappingURL=checksumFile.js.map