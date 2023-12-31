"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserEmailForgotPassword = exports.validateResetpassword = exports.validateUserEmail = exports.userLoginValidationSchema = exports.userRegisterValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userRegisterValidationSchema = joi_1.default.object({
    username: joi_1.default.string().required().min(2).max(30),
    fullname: joi_1.default.string().required().min(2).max(30),
    email: joi_1.default.string().email({
        minDomainSegments: 1,
        tlds: {
            allow: ["com"],
        },
    }),
    phone_no: joi_1.default.number().required(),
    // phone_no: joi.number().required().min(9).max(20),
    password: joi_1.default
        .string()
        .required()
        .min(8)
        .pattern(new RegExp("^[a-zA-Z0-9!@#%$&*()]{0,30}$")),
});
exports.userLoginValidationSchema = joi_1.default.object({
    email: joi_1.default.string().email({
        minDomainSegments: 2,
        tlds: {
            allow: ["ke", "com"],
        },
    }),
    password: joi_1.default
        .string()
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9!@#%$&*()]{0,30}$")),
});
exports.validateUserEmail = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.validateResetpassword = joi_1.default.object().keys({
    userID: joi_1.default.string().min(8).required(),
    password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9!@#%$&*()]{0,30}$")),
});
exports.validateUserEmailForgotPassword = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
});
