
exports.up = function(knex) {
  return knex.schema.createTable('tray', (table) => {
    table.increments('id').primary()
    table.text("tray_number")
    table.text("pH")
    table.text("temperature")
    table.text("ppm")
  })
}; 

exports.down = function(knex) {
  return knex.schema.dropTable('tray')  
};
