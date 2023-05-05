const books = require('../models/Books');

const postBook = async (req, res) => {
  try {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;
    let finished = false;

    if (readPage > pageCount) {
      return response(res, {
        code: 400,
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        content: '',
      });
    } else if (readPage === pageCount) {
      finished = true;
    } else {
      finished = false;
    }

    const data = { name, year, author, summary, publisher, pageCount, readPage, reading, finished };
    const message = await books.create(data);

    return response(res, {
      code: 201,
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      content: {
        bookId: message._id,
      },
    });
  } catch (error) {
    return response(res, {
      code: 400,
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
      content: '',
    });
  }
};

const getBooks = async (req, res) => {
  try {
    const allData = await books.find();
    let dataItem = [];
    for (let i = 0; i < allData.length; i++) {
      dataItem = [
        ...dataItem,
        {
          id: allData[i]._id,
          name: allData[i].name,
          publisher: allData[i].publisher,
        },
      ];
    }

    const message = { books: dataItem };
    return response(res, {
      code: 200,
      status: 'success',
      message: '',
      content: message,
    });
  } catch {
    return response(res, {
      code: 404,
      status: 'fail',
      message: 'Buku tidak ditemukan',
      content: '',
    });
  }
};

getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    let dataItem = [];
    await books.find({ _id: id }).then((result) => {
      dataItem = result;
    });
    const message = { book: dataItem };
    return response(res, {
      code: 200,
      status: 'success',
      message: '',
      content: message,
    });
  } catch {
    return response(res, {
      code: 404,
      status: 'fail',
      message: 'Buku tidak ditemukan',
      content: '',
    });
  }
};

updateBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;
    let finished = false;

    if (name.length === 0) {
      return response(res, {
        code: 400,
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
        content: '',
      });
    }
    console.log(name.length);

    if (readPage > pageCount) {
      return response(res, {
        code: 400,
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        content: '',
      });
    } else if (readPage === pageCount) {
      finished = true;
    } else {
      finished = false;
    }

    const data = { name, year, author, summary, publisher, pageCount, readPage, reading, finished };
    const filter = { _id: id };
    await books.findOneAndUpdate(filter, data).then(() => {
      return response(res, {
        code: 200,
        status: 'success',
        message: 'Buku berhasil diperbarui',
        content: '',
      });
    });
  } catch {
    return response(res, {
      code: 404,
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
      content: '',
    });
  }
};

deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const filter = { _id: id };

    await books.deleteOne(filter).then(() => {
      return response(res, {
        code: 200,
        status: 'success',
        message: 'Buku berhasil dihapus',
        content: '',
      });
    });
  } catch {
    return response(res, {
      code: 404,
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
      content: '',
    });
  }
};

module.exports = { postBook, getBooks, getBookById, updateBookById, deleteBook };

const response = (res, data) => {
  return res.status(data.code).json({
    status: data.status,
    message: data.message || null,
    data: data.content || null,
  });
};
