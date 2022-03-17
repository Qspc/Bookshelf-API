const router = require('express').Router();
const userController = require('../controller/User.js');

app.post('/registrasi/', async (req, res) => {
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
  if (!noTelp || typeof noTelp !== 'number') {
    return res.json({ status: 'error', error: 'invalid noTelp' });
  }
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

module.exports = router;
