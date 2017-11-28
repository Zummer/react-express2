// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: 'mysql', // servise_name in docker network
      database: 'bookworm1',
      user:     'root',
      password: 'admin'
    }
  },
};
