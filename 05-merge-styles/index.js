const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const bundleFolder = path.join(__dirname, 'project-dist');

const bundleFile = fs.createWriteStream(path.join(bundleFolder, 'bundle.css'), 'utf8');

const files = fs.promises.readdir(stylesFolder);


files.then( data => {
  data.forEach(item => {
    const filePath = path.join(stylesFolder, item);

    if (path.parse(filePath).ext !== '.css') return;

    const readStream = fs.createReadStream(filePath, 'utf8');

    readStream.on('data', function (chunk) {
      bundleFile.write(chunk, 'utf8');
    });
  });
}).catch(err => {
  throw new Error(err);
});