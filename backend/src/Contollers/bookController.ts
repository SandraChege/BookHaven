import { Request, Response } from "express";
import mssql from "mssql";

import { v4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sqlConfig } from "../Config/sqlConfig";

import { query, execute } from "../Helpers/dbHelpers";
import { ExtendedUser } from "../Middlewares/verfiyToken";
import { updateUser } from "../Interface/user";
import { hashPass } from "../Services/passwordHash";
import { isEmpty } from "lodash";
import {
  validateBook,
  validateBookId,
  validateUpdateBook,
} from "../Validators/book";
import { Book } from "../Interface/book";

//CREATE BOOKS
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, genre, bookImage, content, userID, series } =
      req.body;

    // console.log(req.body);

    const { error } = validateBook.validate(req.body);

    // console.log(error);

    if (error)
      return res.status(400).send({ error: "please place correct details" });

    const newPost: Book = {
      bookID: v4(),
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

    await execute(procedure, params);
    return res.send({ message: "book review created successfully" });
  } catch (error) {
    console.log(error);
    res.send((error as Error).message);
  }
};

//GET ALL BOOKS
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const procedureName = "getBooks";
    const result = await query(`EXEC ${procedureName}`);
    // console.log(result.recordset);

    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};

//UPDATE BOOKS
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookID, title, author, genre, bookImage, content, userID, series } =
      req.body;
    console.log(req.body);

    const { error } = validateUpdateBook.validate(req.body);

    console.log(error);

    if (error)
      return res.status(400).send({ error: "please put correct details" });

    const newProject: Book = {
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

    await execute(ProcedureName, params);

    return res
      .status(200)
      .send({ message: "Book review updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Server Error",
    });
  }
};

//DELETE BOOK
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookID = req.params.ID;
    if (!bookID) return res.status(400).send({ error: "Id is required" });

    const { error } = validateBookId.validate({ bookID });

    if (error) return res.status(400).send({ error: "please input id" });

    const procedureName = "deleteBook";
    await execute(procedureName, { bookID });

    res.status(201).send({ message: "product deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};

//GET SINGLE BOOK
export const getSingleBook = async (req: Request, res: Response) => {
  try {
    const bookID = req.params.ID;
    console.log(bookID);

    if (!bookID) return res.status(400).send({ error: "Id is required" });

    const { error } = validateBookId.validate({ bookID });
    console.log(error);

    if (error) return res.status(400).send({ error: error.details[0].message });
    // console.log("hello");

    const procedureName = "getBookById";
    const result = await execute(procedureName, { bookID });

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};
