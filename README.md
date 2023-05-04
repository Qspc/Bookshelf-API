Judul : Bookshelf API

- Kriteria 1 : Aplikasi menggunakan port 9000
- Kriteria 2 : Aplikasi dijalankan dengan perintah npm run start.
- Pastikan aplikasi tidak dijalankan dengan menggunakan nodemon. Jika Anda ingin menggunakan nodemon dalam proses development, masukkan nodemon kedalam runner script lain, contohnya:
- URL : /books (POST)
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
- server gagal:
