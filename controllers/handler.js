const { nanoid } = require('nanoid');
const books = require('../models/books');

const addNoteHandler = async (req, res) => {
  // eslint-disable-next-line max-len
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;
  let finished = false;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  {
    /* eslint-disable max-len */
  }
  if (readPage > pageCount) {
    const response = await res.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  } else if (readPage === pageCount) {
    finished = true;
  } else {
    finished = false;
  }

  if (!name || name.length === 0) {
    const response = await res.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  const data = {
    id,
    createdAt,
    updatedAt,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
  };

  await books.push(data);

  const isSuccess = (await books.filter((note) => note.id === id).length) > 0;

  if (isSuccess) {
    const response = await res.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: data.id,
      },
    });
    response.code(201);
    return response;
  } else {
    const response = await res.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
};

const getAllBooksHandler = async (req, res) => {
  let dataItem = [];
  const nama = req.query.name;
  const read = Number(req.query.reading) === 1 ? true : false;
  const finish = Number(req.query.finished) === 1 ? true : false;
  let bookData = books;

  if (nama) {
    bookData = books.filter((item) => item.name.toLowerCase().includes(nama));
  }
  if (read) {
    bookData = books.filter((item) => item.reading === read);
  }
  if (finish) {
    bookData = books.filter((item) => item.finished === finish);
  }

  for (let i = 0; i < bookData.length; i++) {
    dataItem = [
      ...dataItem,
      {
        id: books[i].id,
        name: books[i].name,
        publisher: books[i].publisher,
      },
    ];
  }

  const message = { books: dataItem };
  const response = await res.response({
    status: 'success',
    data: message,
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = async (req, res) => {
  const { id } = req.params;

  const book = await books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    const response = await res.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  const response = await res.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const updateBookByIdHandler = async (req, res) => {
  const { id } = req.params;
  const index = await books.findIndex((note) => note.id === id);

  // eslint-disable-next-line max-len
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;
  let finished = false;
  const updatedAt = new Date().toISOString();

  if (!name || name.length === 0) {
    const response = await res.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  {
    /* eslint-disable max-len */
  }
  if (readPage > pageCount) {
    const response = await res.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  } else if (readPage === pageCount) {
    finished = true;
  } else {
    finished;
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    const response = await res.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = await res.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = async (req, res) => {
  const { id } = req.params;
  const index = await books.findIndex((note) => note.id === id);

  if (index !== -1) {
    await books.splice(index, 1);

    const response = await res.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = await res.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
