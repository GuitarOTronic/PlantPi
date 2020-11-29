const fs = require('fs')
const path = require('path')
const db = require('../knex/knex.js')
const fileURLToPath = require('url').fileURLToPath
const  { dirname, parse } = path

// const __fName = fileURLToPath(import(meta.url));
// const __dirname = dirname(__fName);
// const x = parse(__fName)
const DATA_PATH = '/home/pi/projects/PlantPi/sensors/Temperature/tempData/'

class TemperatureModel {

  static all() {
    // return new Promise((resolve, reject) => {
    //   let tempData = []
    //   try {
    //     fs.readdirSync(DATA_PATH).forEach(file => {
    //       tempData.push(JSON.parse(fs.readFileSync(`${DATA_PATH}${file}`)))
    //       return tempData
    //     })
    //     resolve(tempData)
    //   }
    //   catch (err) {
    //     reject(new Error(err));
    //   }
    // });

    return db("temperature")
      .returning("*")
  }

  static saveTemperatureData(temperatureData) {
    return db("temperature")
      .insert(temperatureData)
      .returning("*")
  }
}

module.exports = TemperatureModel