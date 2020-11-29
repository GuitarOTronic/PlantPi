const express = require('express')
const TemperatureController = require('../sensors/Temperature/TemperatureController.js')
const router = express.Router()

router.get('/', TemperatureController.getAllTempData)
router.get('/current', TemperatureController.getTemperatureF)

module.exports = router