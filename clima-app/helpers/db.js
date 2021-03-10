const fs = require('fs');

const path = './db/places.json'

const saveRecord = (data) => {
  return fs.writeFileSync(path, JSON.stringify(data))
}

const readRecord = () => {
  if(!fs.existsSync(path)){
    return null;
  }

  const recordData = fs.readFileSync(path, { encoding:'utf-8' });

  return JSON.parse(recordData);
}

module.exports = {
  saveRecord,
  readRecord
}