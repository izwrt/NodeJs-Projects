import express from 'express';
import * as authorController from '../controllers/author.controller.js'

const router = express.Router();

router.get('/', authorController.getAllAuthors)

router.get('/:id', authorController.getAutherById);

router.post('/', authorController.postAuthor)

router.delete('/:id', authorController.deleteAuthor);

export default router;