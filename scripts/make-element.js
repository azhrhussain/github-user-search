const fs = require('fs');
const path = require('path');
const basePath = path.resolve('.', 'src', 'elements');
if (process.argv.length < 3) {
  throw 'filename not specified.';
}
const filename = process.argv[process.argv.length - 1];
if (/^[A-Za-z][A-Za-z0-9]+$/.test(filename) === false) {
  throw 'filename must only contain alphabets and numbers';
}
const lowerCase = filename.toLowerCase();
const camelCase = lowerCase[0].toUpperCase() + lowerCase.slice(1);
const folderPath = path.join(basePath, camelCase);
const indexFilePath = path.join(basePath, camelCase, 'index.tsx');
try {
  fs.mkdirSync(folderPath, {recursive: true});
  fs.writeFileSync(indexFilePath,'','utf8');
} catch (error) {
  throw error;
}