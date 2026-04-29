import express, {Router} from 'express';
import * as bookController from './../controllers/book.controller.js'

const router = Router();

//Routes
router.get("/", bookController.getBooks);

router.get("/:id", bookController.getBookById);

router.post("/", bookController.postBook)

router.delete("/:id", bookController.deleteBookById)

export default router;