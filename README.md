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

- cara mencari element query pada suatu database. misal mau mencari data yg terdapat element "category"
  db.products.find({
  category: {
  $exists: false
  }
  });
- mencari dengan berdasarkan operator :
  https://docs.mongodb.com/manual/reference/operator/query/expr/ (expr -> bikin uppercase, buat filter dll)
  http://json-schema.org/ (jsonschema -> filter yg required)
  (regex -> cek kalimat yg ada, ex: yg mengandung kata "mie")
  (where -> mirip fungsi if)

operator untuk megatur array :

- $all: ["value"] = mengambil semua array yg mengandung kata tersebut
- $elemMatch = mengambil data yg setidaknya ada salah satu
- $size = mengeluarkan produk yg memiliki array sebanyak n
