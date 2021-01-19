const db = require('../knex/knex.js')

class DataModel {

  static all() {
    return db("data")
      .returning("*")
  }

  static create(type, insertData) {
    return db(type)
      .insert(insertData)
  }
}

module.exports = DataModel