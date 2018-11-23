const _     = require('lodash');
const fs    = require('fs');
const parse = require('csv-parse');

const { loadFileContent } = require('./util.js');

const preparePortfolio = (entries) => {
  return _.map(entries, (entry) => {
    return {
      title: _.get(entry, 'Produkt'),
      ISIN: _.get(entry, 'Symbol/ISIN'),
      amount: parseInt(_.get(entry, 'Anzahl', 0)),
      currency: _.get(entry, 'Wert'),
      value: parseFloat(_.get(entry, '').replace(',', '.')),
    };
  });
};

const getPortfolio = (filepath) => {
  return loadFileContent(filepath)
    .then(parseContent({ columns: true }))
    .then(preparePortfolio)
};

const parseContent = _.curry((options, content) => {
  return new Promise((resolve, reject) => {
    parse(content, options, (err, output) => {
      err ? reject(err) : resolve(output);
    })
  });
});

const TRANSACTION_COLUMNS = [
  'date',
  'time',
  'title',
  'ISIN',
  'exchange',
  'amount',
  'local_share_price_currency',
  'local_share_price',
  'local_total_price_currency',
  'local_total_price',
  'target_total_price_after_fee_currency',
  'target_total_price_after_fee',
  'exchange_rate',
  'exchange_fee_currency',
  'exchange_fee',
  'target_total_price_currency',
  'target_total_price',
];

const TRANSACTION_FLOATS = [
  'local_share_price',
  'local_total_price',
  'target_total_price_after_fee',
  'exchange_rate',
  'exchange_fee',
  'target_total_price',
];

const getTransactions = (filepath) => {
  return loadFileContent(filepath)
    .then(parseContent({ columns: TRANSACTION_COLUMNS }))
    .then(prepareTransactions)
};

const prepareTransactions = (entries) => {
  return _.map(entries, (entry) => {
    entry.amount = parseInt(_.get(entry, 'amount', 0));

    TRANSACTION_FLOATS.forEach((property) => {
      entry[property] = parseFloat(_.get(entry, property).replace(',', '.'));
    });

    return entry;
  });
};

const explore = (filepath, prepare) => {
  loadFileContent(filepath)
    .then((content) => {
      return new Promise((resolve, reject) => {
        parse(content, { columns: true }, (err, output) => {
          err ? reject(err) : resolve(output);
        })
      });
    })
    .then((entries) => {
      return prepare ? prepare(entries) : entries;
    })
    .then(console.log)
    .catch(console.log);
};

module.exports = {
  explore,

  getPortfolio,
  preparePortfolio,

  getTransactions,
};
