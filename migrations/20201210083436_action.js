
exports.up = function(knex) {
  return knex.schema.createTable('action', (table) => {
    table.increments('id').primary();
    table.integer("action_type_id").references("id").inTable("action_type");
    table.timestamps();
    table.boolean("completed")
  })
}; 

exports.down = function(knex) {
  return knex.schema.dropTable('action')  
};
