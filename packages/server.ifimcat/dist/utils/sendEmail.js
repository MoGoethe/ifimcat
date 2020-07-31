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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
function sendMail(email, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const { host, port, secure, auth: { user, pass }, tls: { rejectUnauthorized } } = config_1.default.mailServer;
        const transporter = nodemailer_1.default.createTransport({
            host,
            port: Number(port),
            secure: !!secure,
            auth: {
                user,
                pass,
            },
            tls: {
                rejectUnauthorized: !!rejectUnauthorized,
            }
        });
        const output = `
    <h3>您正在使用Ifimcat, 点击链接查看详情</h3>
    <p style="font-size:14px"><a href="${url}" style="color:#321fdb">${url}</a></p>
  `;
        let mailOptions = {
            from: user,
            to: email,
            subject: '欢迎使用Ifimcat',
            html: output
        };
        yield transporter.sendMail(mailOptions);
    });
}
exports.sendMail = sendMail;
//# sourceMappingURL=sendEmail.js.map