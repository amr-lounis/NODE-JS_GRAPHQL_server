const SQLite =require('sqlite3');
const cnf = require('./cnf')

const environments = {
  development: {
    username: cnf.db_mysql_username,
    password: cnf.db_mysql_password,
    database: cnf.db_mysql_database,
    host:     cnf.db_mysql_host,
    port:     cnf.db_mysql_port,
    dialect: "mysql",
    define: {
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
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
    username: cnf.db_mysql_username,
    password: cnf.db_mysql_password,
    database: cnf.db_mysql_database,
    host: cnf.db_mysql_host,
    port: cnf.db_mysql_port,
    dialect: "mysql",
    define: {
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
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
    database: cnf.db_sqlite_database,
    username: cnf.db_sqlite_username,
    password: cnf.db_sqlite_password,
    dialect: "sqlite",
    storage: cnf.db_sqlite_storage,
    dialectOptions: { mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX},
    charset: 'utf8',
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    // query:{
    //   raw: true,
    //   nest: true,
    // },
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


const environment = environments['sqlite_env']
console.log(environment)
module.exports = {
  environment : environment
}
