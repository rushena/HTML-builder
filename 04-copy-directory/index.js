const { mkdir, copyFile, readdir, stat, rm } = require('node:fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'files');
const folderPathCopy = path.join(__dirname, 'files-copy');

const folderStat = stat(folderPathCopy);

folderStat.then(() => {
  const removeOldFolder = rm(folderPathCopy, {
    recursive: true
  });
  removeOldFolder.then(() => {
    copy();
  });
}).catch(() => {
  copy();
});

function copy () {
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
  });
}