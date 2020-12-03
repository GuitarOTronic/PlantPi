const db = require('../knex/knex.js')

class DataModel {

  static all() {
    return db("data")
      .returning("*")
  }

  static create(data) {
    return db("plant")
      .insert(data)
  }
}

module.exports = DataModel