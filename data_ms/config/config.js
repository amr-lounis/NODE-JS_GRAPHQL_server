const cnf = require("../cnf")
const SQLite =require('sqlite3');

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
  mysql_env: {
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
  sqlite_env: {
    database: "database",
    username: "root",
    password: "",
    dialect: 'sqlite',
    storage: 'database.sqlite',
    dialectOptions: { mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX},
    charset: 'utf8',
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    sync: {
        force: false
    },
    logging: false
  },
  test: {

  },
  production: {

  }
}
