// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'garage_garden',
      user: 'pi',
      password: ''
    },
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'garage_garden',
      user: 'pi',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'garage_garden',
      user: 'pi',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
