/**
 * Files need to be formated or filtered based on the file extension which user is providing
 * jsx
 * tsx
 * js
 * ts
 * all
 */

const fs = require('fs');
const path = require('path');
function readFiles({ filterFile, p }) {
  const folderPath = path.resolve(p);
  const pattern = new RegExp(/\.(js|ts|tsx|jsx)$/);

  // check exist
  if (!fs.existsSync(folderPath)) {
    console.error('Folder not found:', folderPath);
    process.exit(1);
  } else {
    const customPattern =
      filterFile === 'all' ? pattern : new RegExp(`\.(${filterFile})$`);
    const files = fs.readdirSync(folderPath, {
      recursive: true,
    });
    return files
      .map((file) => {
        const filePath = path.join(folderPath, file);
        if (fs.statSync(filePath).isFile()) {
          if (customPattern.test(filePath)) {
            return filePath;
          }
        } else {
          return null;
        }
      })
      .filter(Boolean);
  }
}
function getFileContent({ filterFile, content = [] }) {
  const files = content.map((p) => {
    const files = readFiles({
      filterFile,
      p,
    });
    return files;
  });
  return files.flat();
}
module.exports = {
  getFileContent,
};
