const fs = require( 'fs')
const ds18b20 = require( 'ds18b20')
const fileURLToPath = require( 'url').fileURLToPath
const dirname = require( 'path').dirname
const convertCelsiusToFahrenheit = require( './utils.js')
const temperatureTimer = require( '../services/timer.js')
const TemperatureModel = require( '../../model/TemperatureModel.js')
const Axios = require( 'axios')

// const __fName = fileURLToPath(import.meta.url);
// const __dName = dirname(__fName);
const TEN_MINUTES = 600000

const getTemperature = async (API_KEY, cb) => {

  try {
    const bellinghamWeather = await Axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=98226&units=imperial&appid=${API_KEY}`)
    await ds18b20.temperature('28-0115721161ff', function (err, degC) {
      let tempF = convertCelsiusToFahrenheit(degC)
      cb(tempF, bellinghamWeather.data)
    })
  } catch (err) {
    throw Error("Error getting temp: ", err)
  }
}

class TemperatureController {
  constructor() {
    this.tempCounter = 0
    this.API_KEY = process.env.API_KEY || this.getApiKey

  }

  startTempRoutine = () => {
    // temperatureTimer(TEN_MINUTES, this.recordTemp)
  }

  getApiKey = async () => {
    try {
      const apiKey = JSON.parse(fs.readFileSync(`${__dName}/apiKey.json`))
      return apiKey
    }
    catch (err) {
      currentData = JSON.stringify([])
    }
  }

  recordTemp = async () => {
    await getTemperature(this.API_KEY, (tempF, bellinghamWeather) => {
      const now = new Date().toISOString()
      const currentTemp = {
        time: now,
        temperature: tempF,
        openWeatherTemp: bellinghamWeather.main.temp
      }
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
      currentData = fs.readFileSync(`${__dName}/tempData/${fileName}.json`)
    }
    catch (err) {
      currentData = JSON.stringify([])
    }
    const parsedData = JSON.parse(currentData)
    const dataToSave = [...parsedData, tempData]
    const jsonTempData = JSON.stringify(dataToSave)
    try {
      fs.writeFileSync(`${__dName}/tempData/${fileName}.json`, jsonTempData)
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

module.exports = TemperatureController
