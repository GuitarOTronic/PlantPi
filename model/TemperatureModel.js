const fs = require('fs')
const path = require('path')
const fileURLToPath = require('url').fileURLToPath
const  { dirname, parse } = path

const __filename = fileURLToPath(require(meta.url));
const __dirname = dirname(__filename);
const x = parse(__filename)
const DATA_PATH = '/home/pi/projects/PlantPi/sensors/Temperature/tempData/'

class TemperatureModel {

  static all() {
    return new Promise((resolve, reject) => {
      let tempData = []
      try {
        fs.readdirSync(DATA_PATH).forEach(file => {
          tempData.push(JSON.parse(fs.readFileSync(`${DATA_PATH}${file}`)))
          console.log(tempData)
          return tempData
        })
        resolve(tempData)
      }
      catch (err) {
        reject(new Error(err));
      }
    });

  }
}

module.exports = TemperatureModel