const books = require('../models/Books');

const postBook = async (req, res) => {
  const booksData = req.data;
  console.log(booksData);
  return response(res, {
    code: 200,
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    content: booksData,
  });
};

const getBooks = async (req, res) => {
  console.log('selamat ngambil buku');
  return response(res, {
    code: 200,
    status: 'success',
    content: dummyBooks,
  });
};

module.exports = { postBook, getBooks };

const dummyBooks = [
  {
    id: 'Qbax5Oy7L8WKf74l',
    name: 'Buku A',
    publisher: 'Dicoding Indonesia',
  },
  {
    id: '1L7ZtDUFeGs7VlEt',
    name: 'Buku B',
    publisher: 'Dicoding Indonesia',
  },
  {
    id: 'K8DZbfI-t3LrY7lD',
    name: 'Buku C',
    publisher: 'Dicoding Indonesia',
  },
];

const response = (res, data) => {
  return res.status(data.code).json({
    status: data.status,
    message: data.message || null,
    data: data.content || null,
  });
};
