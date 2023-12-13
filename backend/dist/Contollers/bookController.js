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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleBook = exports.deleteBook = exports.updateBook = exports.getAllBooks = exports.createBook = void 0;
const uuid_1 = require("uuid");
const dbHelpers_1 = require("../Helpers/dbHelpers");
const book_1 = require("../Validators/book");
//CREATE BOOKS
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, genre, bookImage, content, userID, series } = req.body;
        // console.log(req.body);
        const { error } = book_1.validateBook.validate(req.body);
        // console.log(error);
        if (error)
            return res.status(400).send({ error: "please place correct details" });
        const newPost = {
            bookID: (0, uuid_1.v4)(),
            author,
            genre,
            content,
            bookImage,
            title,
            userID,
            series,
        };
        const procedure = "createBook";
        const params = newPost;
        yield (0, dbHelpers_1.execute)(procedure, params);
        return res.send({ message: "book review created successfully" });
    }
    catch (error) {
        console.log(error);
        res.send(error.message);
    }
});
exports.createBook = createBook;
//GET ALL BOOKS
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const procedureName = "getBooks";
        const result = yield (0, dbHelpers_1.query)(`EXEC ${procedureName}`);
        // console.log(result.recordset);
        return res.json(result.recordset);
    }
    catch (error) {
        console.log(error);
        res.status(404).send({ message: "internal server error" });
    }
});
exports.getAllBooks = getAllBooks;
//UPDATE BOOKS
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookID, title, author, genre, bookImage, content, userID, series } = req.body;
        console.log(req.body);
        const { error } = book_1.validateUpdateBook.validate(req.body);
        console.log(error);
        if (error)
            return res.status(400).send({ error: "please put correct details" });
        const newProject = {
            bookID,
            author,
            genre,
            content,
            bookImage,
            title,
            userID,
            series
        };
        const ProcedureName = "updateBook";
        const params = newProject;
        yield (0, dbHelpers_1.execute)(ProcedureName, params);
        return res
            .status(200)
            .send({ message: "Book review updated successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            error: error.message,
            message: "Internal Server Error",
        });
    }
});
exports.updateBook = updateBook;
//DELETE BOOK
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookID = req.params.ID;
        if (!bookID)
            return res.status(400).send({ error: "Id is required" });
        const { error } = book_1.validateBookId.validate({ bookID });
        if (error)
            return res.status(400).send({ error: "please input id" });
        const procedureName = "deleteBook";
        yield (0, dbHelpers_1.execute)(procedureName, { bookID });
        res.status(201).send({ message: "product deleted Successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            error: error.message,
            message: "Internal Sever Error",
        });
    }
});
exports.deleteBook = deleteBook;
//GET SINGLE BOOK
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookID = req.params.ID;
        console.log(bookID);
        if (!bookID)
            return res.status(400).send({ error: "Id is required" });
        const { error } = book_1.validateBookId.validate({ bookID });
        console.log(error);
        if (error)
            return res.status(400).send({ error: error.details[0].message });
        // console.log("hello");
        const procedureName = "getBookById";
        const result = yield (0, dbHelpers_1.execute)(procedureName, { bookID });
        res.json(result.recordset);
    }
    catch (error) {
        console.log(error);
        res.status(404).send({ message: "internal server error" });
    }
});
exports.getSingleBook = getSingleBook;
