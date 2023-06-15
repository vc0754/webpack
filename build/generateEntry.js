const path = require('node:path');
const fs = require('node:fs');

const jsPath = path.join(__dirname, '../src/js');

function generateEntry() {
  let jsFiles = fs.readdirSync(jsPath);
  jsFiles = jsFiles.filter(filename => {
    return /\.js$/.test(filename);
  });

  return jsFiles.reduce((result, filename) => {
    const [point] = filename.split('.');
    result[point] = path.join(jsPath, filename);
    return result;
  }, {});
}

module.exports = generateEntry;
