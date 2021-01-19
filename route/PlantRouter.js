const express = require('express')
const {PlantController} = require('../controller/PlantController.js')
const router = express.Router()

router.get('/', PlantController.getAllData)
router.post('/', PlantController.create)
module.exports = router