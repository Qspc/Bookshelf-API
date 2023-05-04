const router = require('express').Router();
const { postBook, getBooks } = require('../controllers/booksControllers');

router.post('/books', postBook);
router.get('/books', getBooks);

module.exports = router;
