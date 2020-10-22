import { EventEmitter } from 'events'
import fs from 'fs'
import temperatureTimer from '../services/timer.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEN_MINUTES = 600000

class TemperatureController {
  constructor() {
    this.tempCounter = 0
  }

  startTempTimer = () => {
    temperatureTimer(1000, this.recordTemp)
    console.log('chow')
  }

  recordTemp = () => {
    // calls sensor 
    // saves sensor data
    const now = Date()
    const currentTemp = {
      date: now,
      count: this.tempCounter
    }
    this.tempCounter++
  }

  saveTempData() { }

  getAllTempData() { }
}

export default TemperatureController
