const express = require('express')
const router = express.Router()
const user =require('./login')
const photo = require('./Photo')

router.use(user)
router.use(photo)

module.exports = router