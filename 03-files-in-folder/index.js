const fs = require('fs');
const path = require('path');
const process = require('process');

const folderDir = path.join(__dirname, 'secret-folder');

fs.readdir(folderDir, (err, data) => {
  if (err) {
    throw new Error(err);
  }

  data.forEach( file => {

    const filePath = path.join(folderDir, file);

    fs.stat(filePath, (err2, data2) => {
      if (err) {
        throw new Error(err);
      }

      if (!data2.isFile()) return;

      const parsePath = path.parse(filePath);

      process.stdout.write(`${parsePath.name} - ${(parsePath.ext).slice(1)} - ${data2.size / 1024} kb \n`);

    });
  });
});