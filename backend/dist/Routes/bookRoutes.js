"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../Contollers/bookController");
const verfiyToken_1 = require("../Middlewares/verfiyToken");
const book_router = (0, express_1.default)();
book_router.post("/createbook", bookController_1.createBook);
book_router.get("/allbooks", verfiyToken_1.verifyToken, bookController_1.getAllBooks);
book_router.get('/singlebook/:ID', verfiyToken_1.verifyToken, bookController_1.getSingleBook);
book_router.put('/updatebook', bookController_1.updateBook);
book_router.delete('/deletebook/:ID', bookController_1.deleteBook);
exports.default = book_router;
