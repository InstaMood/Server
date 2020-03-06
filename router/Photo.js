const express = require('express').Router()
const router = express
const Controller = require('../controller/ControllerPhoto')
const auth = require('../middleware/authentication')
const img = require('../middleware/img');

router.post('/photo',img,Controller.create)
router.use(auth)
router.patch('/photo/:id',Controller.update)
router.delete('/photo/:id',Controller.delete)
router.get('/photo',Controller.findAll)
router.get('/photo/user',Controller.findAllUser)

module.exports = router