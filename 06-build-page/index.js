const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const buildPath = path.join(__dirname, 'project-dist');

const newDir = fsPromises.mkdir(buildPath, {
  recursive: true
});

newDir.then(() => {
  bundleHTML();
  bundleCss();
  copyDir(path.join(__dirname, 'assets'), path.join(buildPath, 'assets'));
}).catch( err => {
  throw new Error(err);
});

function copyDir (pathDir, clonePath) {
  const newDir = fsPromises.mkdir(clonePath, {
    recursive: true
  });

  newDir.then(() => {
    const folderFiles = fsPromises.readdir(pathDir);

    folderFiles.then((data) => {
      data.forEach(item => {
        const filePath = path.join(pathDir, item);
        const fileStat = fsPromises.stat(filePath);

        fileStat.then(data => {
          if (!data.isFile()) {
            copyDir(filePath, path.join(clonePath, item));
          } else {
            fsPromises.copyFile(filePath, path.join(clonePath, item));
          }
        });
      });
    });
  });
}

function bundleCss () {
  const stylesPath = path.join(__dirname, 'styles');
  const bundleFile = fs.createWriteStream(path.join(buildPath, 'style.css'), 'utf8');
  const files = fsPromises.readdir(stylesPath);

  files.then( data => {
    data.forEach(item => {
      const filePath = path.join(stylesPath, item);

      if (path.parse(filePath).ext !== '.css') return;

      const readStream = fs.createReadStream(filePath, 'utf8');

      readStream.on('data', function (chunk) {
        bundleFile.write(chunk, 'utf8');
      });
    });
  });
}

function bundleHTML () {
  let bundleFile = path.join(buildPath, 'index.html');
  const readStream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf8');

  readStream.on('data', chunk => {
    let chunkCopy = chunk;
    const varComponents = chunkCopy.match(/\{\{\w+\}\}/g);

    if (varComponents.length) {
      varComponents.forEach(item => {
        const readFile = fs.createReadStream(path.join(__dirname, `components/${item.slice(2, -2)}.html`), 'utf8');

        readFile.on('data', text => {
          chunkCopy = chunkCopy.replace(item, text);
          fsPromises.writeFile(bundleFile, chunkCopy, 'utf8');
        });

      });
    } else {
      fsPromises.writeFile(bundleFile, chunkCopy, 'utf8');
    }
  });
}