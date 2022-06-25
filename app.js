const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const user = require('./model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const app = express();
let refreshTokens = []

// sambungan ke database
const db = require('./model/index');
const { json } = require('express/lib/response');
// const database = process.env.MONGO_URI || "mongodb://localhost:27017/mangojs"
const port = process.env.PORT || 5050;

// pengecekan berjalan di port . . .
app.listen(port, function () {
  console.log('server berjalan  di port ' + port);
});

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
    return res.status(404).json({ status: 'error', error: 'invalid username' });
  }
  const id = {id: data._id,}
  if (await bcrypt.compare(password, data.password)) {
    const accessToken = generateAccessToken(id)
    const refreshToken = jwt.sign(id, process.env.REFRESH_TOKEN_SECRET)
    // refreshToken.push(refreshTokens)

    return res.json({ status: 'selamat datang ' + data.userName + 'dengan role' + data.role, accessToken: accessToken, refreshToken : refreshToken });
  }
  else {
    return res.status(404).json({ status: 'error', error: 'invalid password' });
  }

  const refreshToken = accessToken

});

//request token
app.post('/api/token', async (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken === null) return res.json({ status: 'user belum login'})
  if (!refreshTokens.includes(refreshToken)) return res.json({ status: 'akses ditolak'})
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, id) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken(id)
    res.json({ accessToken: accessToken})
  })
})

//logout
app.delete('/api/logout/', async (req, res) => {
  refreshTokens = await refreshTokens.filter(token => token !== req.body.token)
  res.json({ status: "error", error: req.body.taken})
})

// register
app.post('/api/registrasi/', async (req, res) => {
  const { userName, password: plainTextPassword, email, namaLengkap, noTelp, tglLahir, nik, role, alamat } = req.body;

  if (!userName || typeof userName !== 'string') {
    return res.status(400).json({ status: 'error', error: 'invalid username' });
  }
  if (!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.status(400).json({ status: 'error', error: 'invalid password' });
  }
  if (plainTextPassword.length < 5) {
    return res.status(400).json({ status: 'error', error: 'password must more than five character' });
  }
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ status: 'error', error: 'invalid email' });
  }
  if (!namaLengkap || typeof namaLengkap !== 'string') {
    return res.status(400).json({ status: 'error', error: 'invalid namaLengkap' });
  }
  if (!noTelp || typeof noTelp !== 'string') {
    return res.status(400).json({ status: 'error', error: 'invalid noTelp' });
  }
   if (!tglLahir || typeof tglLahir !== 'string') {
    return res.status(400).json({ status: 'error', error: 'invalid tglLahir' });
  }
  if (!nik || typeof nik !== 'string') {
    return res.status(400).json({ status: 'error', error: 'invalid nik' });
  }
  if (nik.length !== 16){
    return res.status(400).json({ status: 'error', error: 'nik is not found' });
  }
  if (!role || typeof role !== 'string') {
    return res.status(400).json({ status: 'error', error: 'invalid role' });
  }
  if (role > 4 || role < 1){
    return res.status(400).json({ status: 'error', error: 'role is not found' });
  }
  if (!alamat || typeof alamat !== 'string') {
    return res.status(400).json({ status: 'error', error: 'invalid alamat' });
  }

  // enkripsi password
  const password = await bcrypt.hash(plainTextPassword, 10);
  const biodata = { userName, password, email, namaLengkap, noTelp, tglLahir, nik, role, alamat };
  try {
    const response = await user.create(biodata);
    console.log('User success !!', response);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: 'error' });
  }

  res.json({ status: 'ok' });
});

//penghubung ke routes
const allRegister = require('./routes/register')
app.use('/api', authenticateToken, allRegister)


//get profile user login
app.get('/api/profile/:userName', authenticateToken, async (req, res) => {
  const {userName} = req.params

  user.find({
    userName
  })

  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    res.send(err)
  })
});


//autentikasi token jwt
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) {
    return  res.status(401).json({message: 'user not login'})
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
    if (err) return  res.status(401).json({message: 'token not valid'})
    req.id = id 
    next()
  })
}

function generateAccessToken(id) {
  return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '3600s'})
}
