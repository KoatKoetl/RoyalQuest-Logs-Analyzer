import fs from 'fs';
import path from 'path';

const sourceDir = './src/files/downloads';
const targetDir = './dist/files/downloads';

// Create the target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy files from source to target directory
fs.readdirSync(sourceDir).forEach((file) => {
  fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
});

console.log('Files copied successfully.');
