
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data.json');

function ensureDataFile() {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
    console.log("data.json created.");
  }
}

function readData() {
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data);
}

function writeData(newData) {
  fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2));
}

module.exports = {
  ensureDataFile,
  readData,
  writeData,
};
