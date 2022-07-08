# RESTFUL API SERVER

**No**|**URL**|**Method**|**Parameter**|**Response**|**Keterangan**
:-----:|:-----:|:-----:|:-----:|:-----:|:-----:
1|https://mango-bm.herokuapp.com/api/registrasi|POST|userName, password, email, namaLengkap, noTelp, tglLahir, nik, role, alamat|message| - 
2|https://mango-bm.herokuapp.com/api/login|POST|userName, password|message, acces_token, refresh_token|ambil access token untuk disimpan pada header page lain
3|https://mango-bm.herokuapp.com/api/all|GET| - |list user (userName, namaLengkap, email, role, alamat)| - 
4|https://mango-bm.herokuapp.com/api/[_id]|GET| _id |_id, userName, password, email, namaLengkap, noTelp, tglLahir, nik, role, alamat, createdAt, UpdateAt| - 
5|https://mango-bm.herokuapp.com/api/profile/[userName]|GET| userName |_id, userName, password, email, namaLengkap, noTelp, tglLahir, nik, role, alamat, createdAt, UpdateAt| - 
6|https://mango-bm.herokuapp.com/api/[_id]|PUT| userName, password, email, namaLengkap, noTelp, tglLahir, nik, role, alamat | message | - 
7|https://mango-bm.herokuapp.com/api/logout|DELETE| - | message | - 


## variabel & atribut yang dipakai

**Variabel Chaincode**|**Atribut**
:-----:|:-----:
User|ID, noTelp, email, namaLengkap, userName, password, tglLahir, nik, role, alamat
Mangga|id, benihID, manggaID, namaPengirim, namaPenerima, kuantitasBenihKg, hargaBenihPerKg, hargaBenihTotal, kuantitasManggaKg, hargaManggaPerKg, hargaManggaTotal, tanggalTransaksi, varietasBenih, umurBenih, pupuk, tanggalTanam, lokasiLahan, ukuran, pestisida, kadarAir, perlakuan, produktivitas, tanggalPanen, tanggalMasuk, teknikSorting, metodePengemasan, pengangkutan, pembeli, caraPembayaran, txID1, txID2, txID3, txID4, isAsset, isConfirmed, isEmpty, isRejected, rejectReason


## dokumentasi Chaincode Pada Channel 1 (Penangkar - Petani - Pengumpul - Pedagang Besar - Konsumen)

- Nama Channel : channel1
- Nama Chaincode/Smart Contract : manggach1_cc
- Peers (aktor yg terlibat) : peer0.penangkar.example.com, peer0.petani.example.com, peer0.pengumpul.example.com, peer0.pedagang.example.com"

**Aktor**|**Aktivitas (fcn)**|**Atribut (input From FE)**|**Keterangan**
:-----:|:-----:|:-----:|:-----:
Penangkar|RegistrasiBenih|{varietasBenih, umurBenih, kuantitasBenihKg}|-
Penangkar|AddKuantitasBenihByID|{quantity} {benihID})|quantity = banyaknya benih yg ditambah, benihID = benih yg di update
Penangkar|CreateTrxManggaByPenangkar|{namaPengirim, namaPenerima, kuantitasBenihKg, hargaBenihPerKg, caraPembayaran}, {benihID}|-
Petani|TanamBenih|{pupuk, lokasiLahan} {ID txID1} |tanggalTanam dibuat di BE
Petani|PanenMangga|{ukuran, pestisida, kadarAir, perlakuan, produktivitas, kuantitasManggaKg} {manggaID}|tanggalPanen dibuat di BE
Petani|{CreateTrxManggaByPetani|namaPengirim, namaPenerima, kuantitasManggaKg, hargaManggaPerKg, caraPembayaran} {manggaID}|-
Pengumpul|CreateTrxManggaByPengumpul|{namaPengirim, namaPenerima, hargaManggaPerKg, kuantitasManggaKg, tanggalMasuk, teknikSorting, metodePengemasan, pengangkutan, caraPembayaran} {ID txID2} |-
Pedagang|CreateTrxManggaByPedagang|{namaPengirim, namaPenerima, hargaManggaPerKg, kuantitasManggaKg, teknikSorting, metodePengemasan, pengangkutan, caraPembayaran}, {ID txID3}|-
Petani, Pengumpul, Pedagang|ConfirmTrxByID|{ID TxID yg bersangkutan}|-
Petani, Pengumpul, Pedagang|RejectTrxByID| {ID TxID yg bersangkutan} {ID transaksi sebelumnya} {kuantitas} {rejectReason}|kuantitas = kuantitas yg akan dikembalikan, rejectReason = alasan tidak diterima 
penangkar, petani, pengumpul, pedagang|CreateUser| {NamaLengkap, Username, Password, Email, NoHP, TanggalLahir, NIK, Role, Alamat}| -

## dokumentasi Chaincode Pada Channel 2 (Penangkar - Petani - Pengumpul - Pedagang Kecil - Konsumen)

- Nama Channel : channel2
- Nama Chaincode/Smart Contract : manggach2_cc
- Peers (aktor yg terlibat) : peer0.penangkar.example.com, peer0.petani.example.com, peer0.pengumpul.example.com, peer0.pedagang.example.com"

**Aktor**|**Aktivitas (fcn)**|**Atribut (input From FE)**|**Keterangan**
:-----:|:-----:|:-----:|:-----:
Penangkar|RegistrasiBenih|{varietasBenih, umurBenih, kuantitasBenihKg}|-
Penangkar|AddKuantitasBenihByID|{quantity} {benihID})|quantity = banyaknya benih yg ditambah, benihID = benih yg di update
Penangkar|CreateTrxManggaByPenangkar|{namaPengirim, namaPenerima, kuantitasBenihKg, hargaBenihPerKg, caraPembayaran}, {benihID}|-
Petani|TanamBenih|{pupuk, lokasiLahan} {ID txID1} |tanggalTanam dibuat di BE
Petani|PanenMangga|{ukuran, pestisida, kadarAir, perlakuan, produktivitas, kuantitasManggaKg} {manggaID}|tanggalPanen dibuat di BE
Petani|{CreateTrxManggaByPetani|namaPengirim, namaPenerima, kuantitasManggaKg, hargaManggaPerKg, caraPembayaran} {manggaID}|-
Pengumpul|CreateTrxManggaByPengumpul|{namaPengirim, namaPenerima, hargaManggaPerKg, kuantitasManggaKg, tanggalMasuk, teknikSorting, metodePengemasan, pengangkutan, caraPembayaran} {ID txID2} |-
Pedagang|CreateTrxManggaByPedagang|{namaPengirim, namaPenerima, hargaManggaPerKg, kuantitasManggaKg, caraPembayaran}, {ID txID3}|-
Petani, Pengumpul, Pedagang|ConfirmTrxByID|{ID TxID yg bersangkutan}|-
Petani, Pengumpul, Pedagang|RejectTrxByID| {ID TxID yg bersangkutan} {ID transaksi sebelumnya} {kuantitas} {rejectReason}|kuantitas = kuantitas yg akan dikembalikan, rejectReason = alasan tidak diterima 
penangkar, petani, pengumpul, pedagang|CreateUser| {NamaLengkap, Username, Password, Email, NoHP, TanggalLahir, NIK, Role, Alamat}| -