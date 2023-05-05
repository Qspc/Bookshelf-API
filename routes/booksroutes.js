const router = require('express').Router();
const { postBook, getBooks, getBookById, updateBookById, deleteBook } = require('../controllers/booksControllers');

router.post('/books', postBook);
router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.put('/books/:id', updateBookById);
router.delete('/books/:id', deleteBook);

module.exports = router;
