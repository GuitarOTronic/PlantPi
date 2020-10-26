import fs from 'fs'
import ds18b20 from 'ds18b20'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import temperatureTimer from '../services/timer.js'
import { convertCelsiusToFahrenheit } from './utils.js'
import TemperatureModel from '../../model/TemperatureModel.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEN_MINUTES = 600000

const getTemperature = async (cb) => {
  try {
    await ds18b20.temperature('28-0115721161ff', function (err, degC) {
      let tempF = convertCelsiusToFahrenheit(degC)
      cb(tempF)
    })
  } catch (err) {
    throw Error("Error getting temp: ", err)
  }
}

class TemperatureController {
  constructor() {
    this.tempCounter = 0
  }

  startTempRoutine = () => {
    temperatureTimer(10000, this.recordTemp)
  }

  recordTemp = async () => {
    await getTemperature((tempF) => {
      const now = new Date().toISOString()
      const currentTemp = {
        time: now,
        temperature: tempF
      }
      console.log('currentTemp', currentTemp)
      this.saveTempDataToJSON(currentTemp)
    })
  }

  static getTemperatureF = async (req, res, next) => {
    let tempF
    // for testing
    // res.json({ currentTemp: convertCelsiusToFahrenheit(3) })

    try {
      await ds18b20.temperature('28-0115721161ff', function (err, degC) {
        tempF = convertCelsiusToFahrenheit(degC)
        res.json({ currentTemp: tempF })
      })
    } catch (err) {
      throw Error("Error getting temp: ", err.message)
    }
  }

  saveTempDataToJSON(tempData) {
    const today = new Date()
    const fileName = `${today.getFullYear()}_${today.getMonth()}_${today.getDate()}`
    let currentData
    try {
      currentData = fs.readFileSync(`${__dirname}/tempData/${fileName}.json`)
    }
    catch (err) {
      currentData = JSON.stringify([])
    }
    const parsedData = JSON.parse(currentData)
    const dataToSave = [...parsedData, tempData]
    const jsonTempData = JSON.stringify(dataToSave)
    try {
      fs.writeFileSync(`${__dirname}/tempData/${fileName}.json`, jsonTempData)
    }
    catch (err) {
      Error(err.message)
    }
  }

  static getAllTempData(req, res, next) {
    TemperatureModel.all().then(response => {
      res.json({ response })
    })
  }
}

export default TemperatureController
