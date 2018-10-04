const path = require('path');
const fs   = require('fs');

const loadFileContent = (filepath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, content) => {
      if(err) {
        reject(err)
      } else {
        try {
          resolve(content);
        } catch(err) {
          reject(err)
        }
      }
    })
  });
}

module.exports = {
  loadFileContent,
};
