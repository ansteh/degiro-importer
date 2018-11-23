const Degiro = require('./index.js');

// Degiro.explore(`${__dirname}/resources/Portfolio.csv`);

// Degiro.getPortfolio(filepath)
//   .then(console.log)
//   .catch(console.log)


// Degiro.explore(`${__dirname}/resources/transactions.csv`);

Degiro.getTransactions(`${__dirname}/resources/transactions.csv`)
  .then(console.log)
  .catch(console.log)
