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