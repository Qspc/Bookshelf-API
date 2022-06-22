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



**Variabel Chaincode**|**Atribut**
:-----:|:-----:
User|ID, NoHP, Email, NamaLengkap, Username, Password, TanggalLahir, NIK, Role, Alamat
Mangga|ID, BenihID, ManggaID, NamaPengirim, NamaPenerima, KuantitasBenihKg, HargaBenihKg, HargaBenihTotal, KuantitasManggaKg, HargaManggaKg, HargaManggaTotal, TanggalTransaksi, VarietasBenih, UmurBenih, Pupuk, TanggalTanam, LokasiLahan, Ukuran, Pestisida, KadarAir, Perlakuan, Produktivitas, TanggalPanen, TanggalMasuk, TeknikSorting, MetodePengemasan, Pengangkutan, Pembeli, CaraPembayaran, TxID1, TxID2, TxID3, TxID4, IsAsset, IsConfirmed, IsEmpty, IsRejected, RejectReason

**Aktor**|**Aktivitas (fcn)**|**Atribut (input From FE)**|**Keterangan**
:-----:|:-----:|:-----:|:-----:
Penangkar|RegistrasiBenih|VarietasBenih, UmurBenih, KuantitasBenihKg|-
Penangkar|AddKuantitasBenihByID|quantity|-
Penangkar|CreateTrxManggaByPenangkar|NamaPengirim, NamaPenerima, HargaBenihKg, CaraPembayaran|-
Petani|TanamBenih|Pupuk, TanggalTanam, LokasiLahan|-
Petani|PanenMangga|Ukuran, Pestisida, KadarAir, Perlakuan, Produktivitas, TanggalPanen, KuantitasManggaKg|-
Petani|CreateTrxManggaByPetani|NamaPengirim, NamaPenerima, HargaManggaTotal, CaraPembayaran|-
Pengumpul|CreateTrxManggaByPengumpul|NamaPengirim, NamaPenerima, HargaManggaKg, KuantitasManggaKg, TanggalMasuk, TanggalTransaksi, TeknikSorting, MetodePengemasan, Pengangkutan, CaraPembayaran|-
Pedagang|CreateTrxManggaByPedagang|NamaPengirim, NamaPenerima, HargaManggaKg, KuantitasManggaKg, TeknikSorting, MetodePengemasan, Pengangkutan, CaraPembayaran|-
