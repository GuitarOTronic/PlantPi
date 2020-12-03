const express = require('express')
const {DataController} = require('../controller/DataController.js')
const router = express.Router()

router.get('/', DataController.getForms)
router.post('/', DataController.create)
module.exports = router


