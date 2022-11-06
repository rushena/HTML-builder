const fs = require('fs');
const path = require('path');
const process = require('process');

const [startMessage, endMessage] = ['Add text \n', 'Good Bye! \n'];
const filePath = path.join(__dirname, 'text.txt');

const writeFile = fs.createWriteStream(filePath, 'utf8');

const exitProcess = () => {
  process.stdout.write(endMessage);
  process.exit();
};

process.stdout.write(startMessage);

process.stdin.on('data', str => {
  const strString = str.toString();

  console.log(strString);

  if (strString.trim() === 'exit') {
    exitProcess();
  }

  writeFile.write(str.toString());
});

process.on('SIGINT', () => {
  exitProcess();
});