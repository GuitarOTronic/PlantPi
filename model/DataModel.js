const db = require('../knex/knex.js')

class DataModel {

  static all() {
    return db("data")
      .returning("*")
  }

  static create(data) {
    console.log("model: ", data)
    return db("data")
      .insert(data)
  }
}

module.exports = DataModel