"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// export interface ExtendedUser1 extends Request {
//   info?: User1;
// }
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers["token"];
        if (!token) {
            return res.status(404).json({
                message: "You do not have access",
            });
        }
        const data = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        req.info = data;
    }
    catch (error) {
        return res.json({
            message: error,
        });
    }
    next();
};
exports.verifyToken = verifyToken;
