
exports.up = function(knex) {
  return knex.schema.createTable('action_type', (table) => {
    table.increments('id').primary()
    table.text("type")
  })
}; 

exports.down = function(knex) {
  return knex.schema.dropTable('action_type')  
};
