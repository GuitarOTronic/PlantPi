
exports.up = function(knex) {
  return knex.schema.createTable('plant', (table) => {
    table.increments('id').primary()
    table.text("name")
    table.text("germination_time")
    table.text("time_to_harvest")
    table.binary("photo")
    table.text("details")

  })
}; 

exports.down = function(knex) {
  return knex.schema.dropTable('plant')  
};
