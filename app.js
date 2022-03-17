const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 5050;
const dbConfig = require('./config/DbConfig');
const cors = require('cors');
const req = require('express/lib/request');
const app = express();
const user = require('./model/User');
const bcrypt = require('bcrypt');
const response = require('./config/response');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'skjafnalsakdlamdlaldamdlamdafalasknksanvksandojaod';

// sambungan ke database
mongoose
  .connect('mongodb://localhost:27017/coba', {
    useNewUrlParser: true,
  })
  .then(() => console.log('connect mongoDB'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(
  bodyParser.json({
    extended: true,
    limit: '50mb',
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
  })
);

// login
app.post('/api/login', async (req, res) => {
  const { userName, password } = req.body;
  const data = await user.findOne({ userName }).lean();
  // res.json(data);

  if (!data) {
    return res.json({ status: 'error', error: 'invalid username/password' });
  }

  if (await bcrypt.compare(password, data.password)) {
    const token = jwt.sign(
      {
        id: data._id,
        userName: data.userName,
      },
      JWT_SECRET
    );

    return res.json({ status: 'selamat datang ' + data.userName, data: token });
  }

  try {
    res.json({ status: 'oke', data: '' });
  } catch (err) {
    console.log(err);
    return res.json({ status: 'error' });
  }
});

// register
app.post('/api/registrasi/', async (req, res) => {
  const { userName, password: plainTextPassword, email, namaLengkap, noTelp, tglLahir, nik, role, alamat } = req.body;

  if (!userName || typeof userName !== 'string') {
    return res.json({ status: 'error', error: 'invalid username' });
  }
  if (!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.json({ status: 'error', error: 'invalid password' });
  }
  if (plainTextPassword.length < 5) {
    return res.json({ status: 'error', error: 'password must more than five character' });
  }
  if (!email || typeof email !== 'string') {
    return res.json({ status: 'error', error: 'invalid email' });
  }
  if (!namaLengkap || typeof namaLengkap !== 'string') {
    return res.json({ status: 'error', error: 'invalid namaLengkap' });
  }
  // if (!noTelp || typeof noTelp !== 'number') {
  //   return res.json({ status: 'error', error: 'invalid noTelp' });
  // }
  if (!nik || typeof nik !== 'string') {
    return res.json({ status: 'error', error: 'invalid nik' });
  }
  if (!role || typeof role !== 'string') {
    return res.json({ status: 'error', error: 'invalid role' });
  }
  if (!alamat || typeof alamat !== 'string') {
    return res.json({ status: 'error', error: 'invalid alamat' });
  }

  // enkripsi password
  const password = await bcrypt.hash(plainTextPassword, 10);
  const biodata = { userName, password, email, namaLengkap, noTelp, tglLahir, nik, role, alamat };
  try {
    const response = await user.create(biodata);
    console.log('User success !!', response);
  } catch (err) {
    console.log(err);
    return res.json({ status: 'error' });
  }

  res.json({ status: 'ok' });
});

// pengecekan berjalan di port . . .
app.listen(port, function () {
  console.log('server berjalan  di port ' + port);
});
