const _     = require('lodash');
const fs    = require('fs');
const parse = require('csv-parse/lib/sync');

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
    .then(content => parse(content, { columns: true }))
    .then(preparePortfolio)
};

module.exports = {
  getPortfolio,
  preparePortfolio,
};
