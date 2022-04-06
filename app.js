const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const user = require('./model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// require('./.env').config()

const ACCESS_TOKEN_SECRET = 'de0df7d1c8d7989f1dbca78138d9fcc3bcd37509642258ff3c9c3e9d47aaeaff9eb878f37fe31571d1a228ea2a245fea7f49a4aaa8a3621b8e1749af1d8720da';
const REFRESH_TOKEN_SECRET = 'c722719ea326a8d7b11a361e441d69048a35497968b475f216d1098f32125baaed45a0619df228a7cf4354d8a41e89e6aa30e55b2a9fc31cb796b036c002579d';

const app = express();
let refreshTokens = []

// sambungan ke database
const db = require('./model/index');
const { json } = require('express/lib/response');
mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connect mongoDB'))
  .catch((err) => console.log(err));

// pengecekan berjalan di port . . .
const port = process.env.PORT || 5050;
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
    return res.json({ status: 'error', error: 'invalid username/password' });
  }
  const id = {id: data._id,}
  if (await bcrypt.compare(password, data.password)) {
    const accessToken = generateAccessToken(id)
    const refreshToken = jwt.sign(id, REFRESH_TOKEN_SECRET)
    // refreshToken.push(refreshTokens)

    return res.json({ status: 'selamat datang ' + data.userName, accessToken: accessToken, refreshToken : refreshToken });
  }

  const refreshToken = accessToken

});

//request token
app.post('/api/token', async (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken === null) return res.json({ status: 'user belum login'})
  if (!refreshTokens.includes(refreshToken)) return res.json({ status: 'akses ditolak'})
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, id) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken(id)
    res.json({ accessToken: accessToken})
  })
})

//logout
app.delete('/api/logout/', async (req, res) => {
  refreshTokens = await refreshTokens.filter(token => token !== req.body.token)
  res.json({ status: "selamat jalan"})
})

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
  if (!noTelp || typeof noTelp !== 'string') {
    return res.json({ status: 'error', error: 'invalid noTelp' });
  }
   if (!tglLahir || typeof tglLahir !== 'string') {
    return res.json({ status: 'error', error: 'invalid tglLahir' });
  }
  if (!nik || typeof nik !== 'string') {
    return res.json({ status: 'error', error: 'invalid nik' });
  }
  if (nik.length !== 16){
    return res.json({ status: 'error', error: 'nik is not found' });
  }
  if (!role || typeof role !== 'string') {
    return res.json({ status: 'error', error: 'invalid role' });
  }
  if (role > 4 || role < 1){
    return res.json({ status: 'error', error: 'role is not found' });
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
    return  res.json({message: 'user not login'})
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, id) => {
    if (err) return  res.json({message: 'user not login'})
    req.id = id 
    next()
  })
}

function generateAccessToken(id) {
  return jwt.sign(id, ACCESS_TOKEN_SECRET, {expiresIn: '300s'})
}
