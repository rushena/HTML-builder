const { mkdir, copyFile, readdir } = require('node:fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'files');
const folderPathCopy = path.join(__dirname, 'files-copy');

const newDir = mkdir(folderPathCopy, {
  recursive: true
});

newDir.then(() => {

  const folderFiles = readdir(folderPath);

  folderFiles.then((data) => {
    data.forEach(item => {
      copyFile(path.join(folderPath, item), path.join(folderPathCopy, item));
    });
  }).catch(err => {
    throw new Error(err);
  });

}).catch(e => {
  throw new Error(e);
})