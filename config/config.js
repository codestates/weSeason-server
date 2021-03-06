const dotenv = require("dotenv");
dotenv.config();

// module.exports = {
//   development: {
//     username: "root",
//     password: process.env.DATABASE_PASSWORD,
//     database: "project",
//     host: "127.0.0.1",
//     dialect: "mysql",
//   },
//   test: {
//     username: "root",
//     password: process.env.DATABASE_PASSWORD,
//     database: "authentication",
//     host: "127.0.0.1",
//     dialect: "mysql",
//   },
//   production: {
//     username: "root",
//     password: process.env.DATABASE_PASSWORD,
//     database: "authentication",
//     host: "127.0.0.1",
//     dialect: "mysql",
//   },
// };

module.exports = {
  development: {
    username: "admin",
    password: process.env.DATABASE_PASSWORD,
    database: "weseasondb",
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "authentication",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "authentication",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
