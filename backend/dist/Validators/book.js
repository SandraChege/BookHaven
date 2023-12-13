"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBookId = exports.validateUpdateBook = exports.validateBook = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateBook = joi_1.default.object().keys({
    title: joi_1.default.string().required(),
    author: joi_1.default.string().required(),
    genre: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    bookImage: joi_1.default.string().required(),
    userID: joi_1.default.string().required(),
    series: joi_1.default.string().required(),
});
exports.validateUpdateBook = joi_1.default.object().keys({
    bookID: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    author: joi_1.default.string().required(),
    genre: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    bookImage: joi_1.default.string().required(),
    userID: joi_1.default.string().required(),
    series: joi_1.default.string().required(),
});
exports.validateBookId = joi_1.default.object().keys({
    bookID: joi_1.default.string().min(8).required(),
});
