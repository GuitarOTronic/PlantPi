import express from 'express'
import TemperatureController from '../sensors/Temperature/TemperatureController.js'
const router = express.Router()

router.get('/', TemperatureController.getAllTempData)
router.get('/current', TemperatureController.getTemperatureF)

export default router