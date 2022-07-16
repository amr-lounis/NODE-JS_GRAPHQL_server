const cnf = require("../cnf")

module.exports = {
  development: {
    username: cnf.db_username,
    password: cnf.db_password,
    database: cnf.db_database,
    host: cnf.db_host,
    port: cnf.db_port,
    dialect: cnf.db_dialect,
    define: {
        charset: 'utf8',
        dialectOptions: {
            collate: cnf.db_collate
        },
        timezone: "+01:00",
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
    sync: {
        force: false
    },
    //isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
    logging: false
  },
  test: {

  },
  production: {

  }
}
