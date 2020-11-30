const fs = require( 'fs')
const ds18b20 = require( 'ds18b20')
const convertCelsiusToFahrenheit = require( './utils.js')
const timedFunctionCall = require( '../utilities/timer.js')
const TemperatureModel = require( '../model/TemperatureModel.js')
const Axios = require( 'axios')

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
    timedFunctionCall(TEN_MINUTES, this.recordTemp)
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

  recordTemp = async (currentTime) => {
    await getTemperature(this.API_KEY, (tempF, bellinghamWeather) => {
      const now = new Date().toISOString()
      console.log("NOW: ", now)
      console.log("currentTime: ", currentTime)
      const currentTemp = {
        date: currentTime,
        temp: tempF,
        openWeatherTemp: bellinghamWeather.main.temp
      }
      this.saveTemperature(currentTemp)
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

  saveTemperature(tempData) {
    try {
      TemperatureModel.saveTemperatureData(tempData).then(res => {
        return res
      })
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
