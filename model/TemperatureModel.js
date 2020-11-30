const db = require('../knex/knex.js')

class TemperatureModel {

  static all() {
    return db("temperature")
      .returning("*")
  }

  static saveTemperatureData(temperatureData) {
    return db("temperature")
      .insert(temperatureData)
  }
}

module.exports = TemperatureModel