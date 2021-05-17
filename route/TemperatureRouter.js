const express = require('express')
const {TemperatureController} = require('../controller/TemperatureController.js')
const router = express.Router()

router.get('/', TemperatureController.getAllTempData)
router.get('/current', TemperatureController.getTemperatureF)
router.get('/dailyForecast', TemperatureController.getDailyForecast)

module.exports = router