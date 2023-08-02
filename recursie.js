const fs = require('fs');
const path = require('path');

function getFolderInfo(folderPath) {
  const folderInfo = {
    path: folderPath,
    numFolders: 0,
    numFiles: 0,
  };

  const items = fs.readdirSync(folderPath);

  items.forEach((item) => {
    const itemPath = path.join(folderPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      folderInfo.numFolders++;
    } else if (stat.isFile()) {
      folderInfo.numFiles++;
    }
  });

  return folderInfo;
}

function createInfoFileRecursive(folderPath) {
  const folderInfo = getFolderInfo(folderPath);
  const infoFilePath = path.join(folderPath, 'info.json');
  const data = JSON.stringify(folderInfo, null, 2);

  fs.writeFileSync(infoFilePath, data, 'utf8');

  console.log(`Created info.json in ${folderPath}`);

  const items = fs.readdirSync(folderPath);

  items.forEach((item) => {
    const itemPath = path.join(folderPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      createInfoFileRecursive(itemPath);
    }
  });
}

const folderPath = 'C:\\Users\\bayke\\OneDrive\\Desktop\\andcards';
createInfoFileRecursive(folderPath);
