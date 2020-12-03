
exports.up = function(knex) {
  return knex.schema.createTable('garden_schedule', (table) => {
    table.increments('id').primary()
    table.date("seed_started")
    table.integer("plant_id").references("id").inTable("plant")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('garden_schedule')  
};
