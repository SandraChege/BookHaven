import Router from "express";
import { createBook, deleteBook, getAllBooks, getSingleBook, updateBook } from "../Contollers/bookController";
import { verifyToken } from "../Middlewares/verfiyToken";


const book_router = Router();

book_router.post("/createbook", createBook);
book_router.get("/allbooks", verifyToken, getAllBooks);
book_router.get('/singlebook/:ID', verifyToken, getSingleBook)
book_router.put('/updatebook', updateBook)
book_router.delete('/deletebook/:ID', deleteBook)

export default book_router;