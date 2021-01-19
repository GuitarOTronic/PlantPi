
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('action_type').del()
    .then(function () {
      // Inserts seed entries
      return knex('action_type').insert([
        {type: 'START_SEED'},
        {type: 'FEED'},
        {type: 'THIN'},
        {type: 'REFRESH_NUTES'},
        {type: 'HARVEST'},
        {type: 'DIED'}
      ]);
    });
};
