const db = require('../knex/knex.js')

class DataModel {

  static all() {
    return db("data")
      .returning("*")
  }

  static create(data) {
    return db(data.type)
      .insert(data)
  }
}

module.exports = DataModel