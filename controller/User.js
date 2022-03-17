const userModel = require('../model/User.js');
const response = require('../config/response.js');
const bcrypt = require('bcrypt');
const { promise } = require('bcrypt/promises');

exports.registrasi = async (data) => {
  const input = new userModel(data);
  const res = await input.save();
  console.log('register berhasil');
  return res;
};

// exports.registrasi = (data) =>
//   new Promise((resolve, reject) => {
//     untuk mengecek
//     console.log(data);

//     new promise((resolve, reject) => {
//       userModel
//         .findOne({ userName: data.userName })
//         .then((user) => {
//           if (user) {
//             resolve(response.commonErrorMsg('ussername sudah ada'));
//           } else {
//             bcrypt.hash(data.password, 10, (err, hash) => {
//               if (err) {
//                 reject(response.commonErrorMsg);
//               } else {
//                 data.password = hash;
//                 userModel
//                   .create(data)
//                   .then(() => resolve(response.commonSuccessMsg('berhasil dikirim')))
//                   .catch(() => reject(response.commonErrorMsg('mohon maaf registrasi gagal')));
//               }
//             });
//           }
//         })
//         .catch(() => reject(response.commonError));
//     });
//   });
