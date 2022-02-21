#BELAJAR MONGODB

kenapa mongoDB :

- menempati database paling banyak digunakan dijenis document store

apa itu document oriented database :

- merubah data kedalam bentuk document (json/xml), tidak ada yg bentuk row
- berbeda dengan relational database (yg bentuk tabel)

yang harus disiapin :

- node js
- mongo db
- postman

step2 install :

- buat folder tempat penyimpanan
- npm init
- install library bcrypt, body-parser, cors, express, mongodb, mongoose, nodemon

- cara buat database cukup gunakan use. contoh : use database. tapi ini baru muncul saat sudah diisi collection
- show databases = liat list database yg dimiliki
- db.dropDatabase() = hapus database
- db.getName() = mengambil nama dtabase
- db.stats() = mengambil statistik penggunaan database
- db.createCollection() = bikin collection

# BSON (binary & JSON)

agar data yg dimasukan tidak hanya tipe teks saja
