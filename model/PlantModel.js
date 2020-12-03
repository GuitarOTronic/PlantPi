const db = require('../knex/knex.js')

class PlantModel {

  static all() {
    return db("plant")
      .returning("*")
  }

  static create(plant) {
    return db("plant")
      .insert(plant)
  }
}

module.exports = PlantModel