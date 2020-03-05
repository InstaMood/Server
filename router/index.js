const express = require('express')
const router = express.Router()
const user =require('./login')

router.use(user)

module.exports = router