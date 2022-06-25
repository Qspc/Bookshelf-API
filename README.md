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
- Nama Chaincode/Smart Contract : manggasatu_cc
- Peers (aktor yg terlibat) : peer0.penangkar.example.com, peer0.petani.example.com, peer0.pengumpul.example.com, peer0.pedagang.example.com"

**Aktor**|**Aktivitas (fcn)**|**Atribut (input From FE)**|**Keterangan**
:-----:|:-----:|:-----:|:-----:
Penangkar|RegistrasiBenih|VarietasBenih, UmurBenih, KuantitasBenihKg|-
Penangkar|AddKuantitasBenihByID|quantity|quantity = banyaknya benih yg ditambah
Penangkar|CreateTrxManggaByPenangkar|NamaPengirim, NamaPenerima, HargaBenihKg, CaraPembayaran|-
Petani|TanamBenih|Pupuk, TanggalTanam, LokasiLahan|-
Petani|PanenMangga|Ukuran, Pestisida, KadarAir, Perlakuan, Produktivitas, TanggalPanen, KuantitasManggaKg|-
Petani|CreateTrxManggaByPetani|NamaPengirim, NamaPenerima, HargaManggaTotal, CaraPembayaran|-
Pengumpul|CreateTrxManggaByPengumpul|NamaPengirim, NamaPenerima, HargaManggaKg, KuantitasManggaKg, TanggalMasuk, TanggalTransaksi, TeknikSorting, MetodePengemasan, Pengangkutan, CaraPembayaran|-
Pedagang|CreateTrxManggaByPedagang|NamaPengirim, NamaPenerima, HargaManggaKg, KuantitasManggaKg, TeknikSorting, MetodePengemasan, Pengangkutan, CaraPembayaran|-

## dokumentasi Chaincode Pada Channel 2 (Penangkar - Petani - Pengumpul - Pedagang Kecil - Konsumen)

- Nama Channel : channel2
- Nama Chaincode/Smart Contract : manggadua_cc
- Peers (aktor yg terlibat) : peer0.penangkar.example.com, peer0.petani.example.com, peer0.pengumpul.example.com, peer0.pedagang.example.com"

**Aktor**|**Aktivitas (fcn)**|**Atribut (input From FE)**|**Keterangan**
:-----:|:-----:|:-----:|:-----:
Penangkar|RegistrasiBenih|VarietasBenih, UmurBenih, KuantitasBenihKg|-
Penangkar|AddKuantitasBenihByID|quantity|quantity = banyaknya benih yg ditambah
Penangkar|CreateTrxManggaByPenangkar|NamaPengirim, NamaPenerima, KuantitasBenihKg, HargaBenihKg, CaraPembayaran|-
Petani|TanamBenih|Pupuk, TanggalTanam, LokasiLahan|-
Petani|PanenMangga|Ukuran, Pestisida, KadarAir, Perlakuan, Produktivitas, TanggalPanen, KuantitasManggaKg|-
Petani|CreateTrxManggaByPetani|NamaPengirim, NamaPenerima, KuantitasManggaKg, HargaManggaTotal, CaraPembayaran|-
Pengumpul|CreateTrxManggaByPengumpul|NamaPengirim, NamaPenerima, HargaManggaKg, KuantitasManggaKg, TanggalMasuk, TanggalTransaksi, TeknikSorting, MetodePengemasan, Pengangkutan, CaraPembayaran|-
Pedagang|CreateTrxManggaByPedagang|NamaPengirim, NamaPenerima, HargaManggaKg, KuantitasManggaKg, CaraPembayaran|-
Petani, Pengumpul, Pedagang|ConfirmTrxByID|-|-
Petani, Pengumpul, Pedagang|RejectTrxByID|RejectReason|-

