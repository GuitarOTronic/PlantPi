
exports.up = function(knex) {
  return knex.schema.createTable('crop', (table) => {
    table.increments('id').primary();
    table.integer("plant_id").references("id").inTable("plant");
    table.date("start_germination")
    table.date("planted")
    table.text("notes")
    table.text("nutes_phase")
    table.integer("tray_id").references("id").inTable("tray")
    table.integer("action_id").references("id").inTable("action")
  })
}; 

exports.down = function(knex) {
  return knex.schema.dropTable('crop')  
};
