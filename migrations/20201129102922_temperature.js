
exports.up = function(knex) {
  return knex.schema.createTable('temperature', (table) => {
    table.increments('id')
    table.text("date")
    table.text("temp").defaultTo("")
    table.text("openWeatherTemp").defaultTo("")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('temperature')  
};
