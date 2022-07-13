require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_TYPE,
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
  test: {

  },
  production: {

  }
}
