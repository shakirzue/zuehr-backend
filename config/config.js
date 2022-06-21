var config = {
    user: 'newSa',
    password: ')Sha+120286',
    database: 'ZueUsaHrDb',
    server: 'localhost',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true
    }
};

module.exports = config