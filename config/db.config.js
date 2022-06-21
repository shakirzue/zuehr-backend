// module.exports = {
//     HOST: "cpcgr.database.windows.net",
//     PORT: "1434",
//     USER: "cpcgradmin",
//     PASSWORD: "cpcgrdb@2022",
//     DB: "NHMSDBTest",
//     dialect: "mssql",
//     logging:false,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   };
module.exports = {
    HOST: "localhost",
    PORT: "1434",
    dialectModulePath: 'DESKTOP-SQLA8O5',
    // USER: "cpcgradmin",
    // PASSWORD: "cpcgrdb@2022",
    DB: "ZueUsaHrDb",
    dialect: "mssql",
    logging:false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };