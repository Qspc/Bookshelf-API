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
User|ID, NoHP, Email, NamaLengkap, Username, Password, TanggalLahir, NIK, Role, Alamat
Mangga|ID, BenihID, ManggaID, NamaPengirim, NamaPenerima, KuantitasBenihKg, HargaBenihKg, HargaBenihTotal, KuantitasManggaKg, HargaManggaKg, HargaManggaTotal, TanggalTransaksi, VarietasBenih, UmurBenih, Pupuk, TanggalTanam, LokasiLahan, Ukuran, Pestisida, KadarAir, Perlakuan, Produktivitas, TanggalPanen, TanggalMasuk, TeknikSorting, MetodePengemasan, Pengangkutan, Pembeli, CaraPembayaran, TxID1, TxID2, TxID3, TxID4, IsAsset, IsConfirmed, IsEmpty, IsRejected, RejectReason


## dokumentasi Chaincode Pada Channel 1 (Penangkar - Petani - Pengumpul - Pedagang Besar - Konsumen)

- Nama Channel : channel1
- Nama Chaincode/Smart Contract : manggach1_cc
- Peers (aktor yg terlibat) : peer0.penangkar.example.com, peer0.petani.example.com, peer0.pengumpul.example.com, peer0.pedagang.example.com"

**Aktor**|**Aktivitas (fcn)**|**Atribut (input From FE)**|**Keterangan**
:-----:|:-----:|:-----:|:-----:
Penangkar|RegistrasiBenih|{VarietasBenih, UmurBenih, KuantitasBenihKg}|-
Penangkar|AddKuantitasBenihByID|{quantity} {BenihID})|quantity = banyaknya benih yg ditambah, BenihID = benih yg di update
Penangkar|CreateTrxManggaByPenangkar|{NamaPengirim, NamaPenerima, KuantitasBenihKg, HargaBenihKg, CaraPembayaran}, {BenihID}|-
Petani|TanamBenih|{Pupuk, LokasiLahan} {ID TxID1} |TanggalTanam dibuat di BE
Petani|PanenMangga|{Ukuran, Pestisida, KadarAir, Perlakuan, Produktivitas, KuantitasManggaKg} {ManggaID}|TanggalPanen dibuat di BE
Petani|{CreateTrxManggaByPetani|NamaPengirim, NamaPenerima, KuantitasManggaKg, HargaManggaKg, CaraPembayaran} {ManggaID}|-
Pengumpul|CreateTrxManggaByPengumpul|{NamaPengirim, NamaPenerima, HargaManggaKg, KuantitasManggaKg, TanggalMasuk, TeknikSorting, MetodePengemasan, Pengangkutan, CaraPembayaran} {ID TxID2} |-
Pedagang|CreateTrxManggaByPedagang|{NamaPengirim, NamaPenerima, HargaManggaKg, KuantitasManggaKg, TeknikSorting, MetodePengemasan, Pengangkutan, CaraPembayaran}, {ID TxID3}|-
Petani, Pengumpul, Pedagang|ConfirmTrxByID|{ID TxID yg bersangkutan}|-
Petani, Pengumpul, Pedagang|RejectTrxByID| {ID TxID yg bersangkutan} {ID transaksi sebelumnya} {kuantitas} {RejectReason}|kuantitas = kuantitas yg akan dikembalikan, RejectReason = alasan tidak diterima 

## dokumentasi Chaincode Pada Channel 2 (Penangkar - Petani - Pengumpul - Pedagang Kecil - Konsumen)

- Nama Channel : channel2
- Nama Chaincode/Smart Contract : manggach2_cc
- Peers (aktor yg terlibat) : peer0.penangkar.example.com, peer0.petani.example.com, peer0.pengumpul.example.com, peer0.pedagang.example.com"

**Aktor**|**Aktivitas (fcn)**|**Atribut (input From FE)**|**Keterangan**
:-----:|:-----:|:-----:|:-----:
Penangkar|RegistrasiBenih|{VarietasBenih, UmurBenih, KuantitasBenihKg}|-
Penangkar|AddKuantitasBenihByID|{quantity} {BenihID})|quantity = banyaknya benih yg ditambah, BenihID = benih yg di update
Penangkar|CreateTrxManggaByPenangkar|{NamaPengirim, NamaPenerima, KuantitasBenihKg, HargaBenihKg, CaraPembayaran}, {BenihID}|-
Petani|TanamBenih|{Pupuk, LokasiLahan} {ID TxID1} |TanggalTanam dibuat di BE
Petani|PanenMangga|{Ukuran, Pestisida, KadarAir, Perlakuan, Produktivitas, KuantitasManggaKg} {ManggaID}|TanggalPanen dibuat di BE
Petani|{CreateTrxManggaByPetani|NamaPengirim, NamaPenerima, KuantitasManggaKg, HargaManggaKg, CaraPembayaran} {ManggaID}|-
Pengumpul|CreateTrxManggaByPengumpul|{NamaPengirim, NamaPenerima, HargaManggaKg, KuantitasManggaKg, TanggalMasuk, TeknikSorting, MetodePengemasan, Pengangkutan, CaraPembayaran} {ID TxID2} |-
Pedagang|CreateTrxManggaByPedagang|{NamaPengirim, NamaPenerima, HargaManggaKg, KuantitasManggaKg, CaraPembayaran}, {ID TxID3}|-
Petani, Pengumpul, Pedagang|ConfirmTrxByID|{ID TxID yg bersangkutan}|-
Petani, Pengumpul, Pedagang|RejectTrxByID| {ID TxID yg bersangkutan} {ID transaksi sebelumnya} {kuantitas} {RejectReason}|kuantitas = kuantitas yg akan dikembalikan, RejectReason = alasan tidak diterima 