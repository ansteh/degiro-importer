const Degiro = require('./index.js');

const filepath = `${__dirname}/resources/Portfolio.csv`;

const test = (filepath, prepare) => {
  loadFileContent(filepath)
    .then((content) => {
      const records = parse(content, { columns: true });
      return records;
    })
    .then((entries) => {
      return prepare ? prepare(entries) : entries;
    })
    .then(console.log)
    .catch(console.log);
};

// test(filepath);

Degiro.getPortfolio(filepath)
  .then(console.log)
  .catch(console.log)
