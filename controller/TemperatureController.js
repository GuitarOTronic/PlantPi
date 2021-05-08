const fs = require('fs')
const ds18b20 = require('ds18b20')
const convertCelsiusToFahrenheit = require('./utils.js')
const timedFunctionCall = require('../utilities/timer.js')
const TemperatureModel = require('../model/TemperatureModel.js')
const Axios = require('axios')
const dotenv = require('dotenv')
dotenv.config();

const GARDEN_MAILER_API_KEY = process.env.GARDEN_MAILER_API_KEY
const TEN_MINUTES = 600//000
//  original temp 28-0115721161ff
// waterproof 1 28-44607e297fff
// waterproof 2 28-e6e0771772ff
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

const getT = async () => new Promise(async (resolve, reject) => {
  try {
    let tempStr = ""
    await ds18b20.temperature('28-0115721161ff', function (err, degC) {
      const temp = convertCelsiusToFahrenheit(degC)
      tempStr += "Old sensor: " + Math.round(temp * 100) / 100 + '\n'
      resolve(tempStr)
    })
    // await ds18b20.temperature('28-44607e297fff', function (err, degC) {
    //   const temp = convertCelsiusToFahrenheit(degC)
    //   tempStr += "Waterproof 1: " +  Math.round(temp * 100)/100 + '\n'
    // })
    // await ds18b20.temperature('28-e6e0771772ff', function (err, degC) {
    //   const temp = convertCelsiusToFahrenheit(degC)
    //   tempStr += " Waterproof 2 " +  Math.round(temp * 100)/100 + '\n'
    //   resolve(tempStr)
    // })
  }
  catch (err) {
    reject(err)
    // throw Error("Ruh Roh: ", err)
  }
})

class TemperatureController {
  constructor() {
    this.tempCounter = 0
    this.API_KEY = process.env.API_KEY || this.getApiKey()

  }

  startTempRoutine = () => {
    timedFunctionCall(TEN_MINUTES, this.recordTemp)
  }

  getApiKey = () => {
    try {
      const { key } = JSON.parse(fs.readFileSync(`${__dirname}/apiKey.json`))
      return key
    }
    catch (err) {
      currentData = JSON.stringify([])
    }
  }

  recordTemp = async (currentTime) => {
    await getTemperature(this.API_KEY, (tempF, bellinghamWeather) => {
      if (tempF > 80) {
        //email nice
        try {
          Axios.post('http://192.168.1.4:8082/', {
            subject: `Current Temp Alert: ${tempF}`,
            body: 'Check yo garden'
          },
            {
              headers: {
                'x-api-key': GARDEN_MAILER_API_KEY
              }
            },
          );
        } catch (err) {
          console.error(err);
        }
      }
      // if (tempF > 80) {
        //email nice
        try {
          Axios.post('http://192.168.1.4:8082/', {
            subject: `Current Temp Alert: ${tempF}`,
            body: 'Check yo garden'
          },
            {
              headers: {
                'x-api-key': GARDEN_MAILER_API_KEY
              }
            },
          );
        } catch (err) {
          console.error(err);
        }
      // }
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

    try {
      await ds18b20.temperature('28-44607e297fff', function (err, degC) {
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

module.exports = { TemperatureController, getTemperature, getT }
