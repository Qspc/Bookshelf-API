Judul : Bookshelf API

- Kriteria 1 : Aplikasi menggunakan port 9000
- Kriteria 2 : Aplikasi dijalankan dengan perintah npm run start.
- Pastikan aplikasi tidak dijalankan dengan menggunakan nodemon. Jika Anda ingin menggunakan nodemon dalam proses development, masukkan nodemon kedalam runner script lain, contohnya:
- body : {
  "name": string,
  "year": number,
  "author": string,
  "summary": string,
  "publisher": string,
  "pageCount": number,
  "readPage": number,
  "reading": boolean
  }
- id : nilai id haruslah unik. Untuk membuat nilai unik, Anda bisa memanfaatkan nanoid.
- finished always false,

Macam macam request :

1. POST = /books

- jika berhasil : kode 201
  {
  "status": "success",
  "message": "Buku berhasil ditambahkan",
  "data": {
  "bookId": "1L7ZtDUFeGs7VlEt"
  }
  }
- jika error : kode 400
  {
  "status": "fail",
  "message": "Gagal menambahkan buku. Mohon isi nama buku"
  }

2. GET = /books

- jika berhasil : kode 200
  {
  "status": "success",
  "data": {
  "books": []
  }
  }
- jika kosong : kode 404
  {
  "status": "fail",
  "message": "Buku tidak ditemukan"
  }
- jika dengan id: kode 200
  {
  "status": "success",
  "data": {
  "book": {
  "id": "aWZBUW3JN_VBE-9I",
  "name": "Buku A Revisi",
  "year": 2011,
  "author": "Jane Doe",
  "summary": "Lorem Dolor sit Amet",
  "publisher": "Dicoding",
  "pageCount": 200,
  "readPage": 26,
  "finished": false,
  "reading": false,
  "insertedAt": "2021-03-05T06:14:28.930Z",
  "updatedAt": "2021-03-05T06:14:30.718Z"
  }
  }
  }

3. PUT : /books/{bookId}

- jike berhasil : kode 200
  {
  "status": "success",
  "message": "Buku berhasil diperbarui"
  }
- harus gagal jika:
  - tidak mencantumkan name : kode 400
    {
    "status": "fail",
    "message": "Gagal memperbarui buku. Mohon isi nama buku"
    }
  - readPage > pageCount : kode 400
    {
    "status": "fail",
    "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
    }
  - id tidak ditemukan : kode 404
    {
    "status": "fail",
    "message": "Gagal memperbarui buku. Id tidak ditemukan"
    }

4. DELETE : /books/{bookId}

- id tidak ditemukan : kode 404
  {
  "status": "fail",
  "message": "Buku gagal dihapus. Id tidak ditemukan"
  }
- jika berhasil : 200
  {
  "status": "success",
  "message": "Buku berhasil dihapus"
  }
