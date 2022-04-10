const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' });
const database = process.env.MONGO_URL || "mongodb://localhost:27017/mangojs"



mongoose.connect(database, { useNewUrlParser: true })
mongoose.connection.on("connected",()=>{
    console.log(`${database} terkoneksi. . .`)
})

module.exports = {mongoose};