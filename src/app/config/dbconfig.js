module.exports = {
    HOST: "localhost",
    PORT: "1434",
    USER: "",
    PASSWORD: "",
    DB: "BMW_ESM_DB",
    dialect: "mssql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };