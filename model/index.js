const dbConfig = require('../config/DbConfig')

const db = {}
db.url = dbConfig.url

db.posts = require('../model/User')

module.exports = db
