const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');

readStream.on('data', function (chunk) {
  console.log(chunk);
});