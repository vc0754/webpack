const path = require('node:path');
const fs = require('node:fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const templatePath = path.resolve(__dirname, '../src');

function generateTemplate(entry) {
  const keys = Object.keys(entry);
  let files = keys.map(key => `${key}.html`);
  files = files.filter(filename => fs.existsSync(path.join(templatePath, filename)));
  
  return files.map(filename => new HtmlWebpackPlugin({
    template: path.resolve(templatePath, filename),
    filename,
    chunks: ['common', filename.split('.')[0]]
  }));
}

module.exports = generateTemplate;
