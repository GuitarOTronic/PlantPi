import { EventEmitter } from 'events'
import fs from 'fs'
import ds18b20 from 'ds18b20'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import temperatureTimer from '../services/timer.js'

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

  convertCelsiusToFahrenheit = (tempC) => {
    return (tempC * 9) / 5 + 32
  }

  getTemperatureF = async () => {
    let tempF
    try {
      await ds18b20.temperature('28-0115721161ff', function (err, value) {
        tempF = this.convertCelsiusToFahrenheit(value)
        console.log("Temp is ", tempF)
        return tempF
      })
    } catch (err) {
      throw Error("Error getting temp: ", err.message)
    }
  }

  saveTempData() { }

  getAllTempData() { }
}

export default TemperatureController
