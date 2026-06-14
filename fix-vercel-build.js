const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const originalBuildDir = path.join(rootDir, 'letsquiz', 'frontend');
const newNextDir = path.join(rootDir, '.next');
const originalNextDir = path.join(originalBuildDir, '.next');

function findNftFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findNftFiles(fullPath));
    } else if (file.endsWith('.nft.json')) {
      results.push(fullPath);
    }
  });
  return results;
}

function main() {
  if (!fs.existsSync(newNextDir)) {
    console.error('.next directory not found at root. Run next build first.');
    process.exit(1);
  }

  // 1. Fix all .nft.json files
  const nftFiles = findNftFiles(newNextDir);
  console.log(`Found ${nftFiles.length} .nft.json files to fix.`);

  nftFiles.forEach(newNftPath => {
    const relativeNftPath = path.relative(newNextDir, newNftPath);
    const originalNftPath = path.join(originalNextDir, relativeNftPath);
    
    const originalNftDir = path.dirname(originalNftPath);
    const newNftDir = path.dirname(newNftPath);
    
    try {
      const data = JSON.parse(fs.readFileSync(newNftPath, 'utf8'));
      if (data.files && Array.isArray(data.files)) {
        data.files = data.files.map(p => {
          // Resolve relative to original directory
          let absolutePath = path.resolve(originalNftDir, p);
          
          // If the path was inside the original .next directory, redirect it to the new .next directory
          if (absolutePath.startsWith(originalNextDir)) {
            const relativeToNext = path.relative(originalNextDir, absolutePath);
            absolutePath = path.join(newNextDir, relativeToNext);
          }
          
          // Relativize relative to new directory
          let newRelative = path.relative(newNftDir, absolutePath);
          return newRelative.replace(/\\/g, '/');
        });
        fs.writeFileSync(newNftPath, JSON.stringify(data, null, 2), 'utf8');
      }
    } catch (err) {
      console.error(`Error processing ${newNftPath}:`, err);
    }
  });

  // 2. Fix required-server-files.json if it exists
  const reqFilesPath = path.join(newNextDir, 'required-server-files.json');
  if (fs.existsSync(reqFilesPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(reqFilesPath, 'utf8'));
      if (data.ignore && Array.isArray(data.ignore)) {
        data.ignore = data.ignore.map(p => {
          const absolutePath = path.resolve(originalNextDir, p);
          let newRelative = path.relative(newNextDir, absolutePath);
          return newRelative.replace(/\\/g, '/');
        });
      }
      fs.writeFileSync(reqFilesPath, JSON.stringify(data, null, 2), 'utf8');
      console.log('Fixed required-server-files.json');
    } catch (err) {
      console.error(`Error processing required-server-files.json:`, err);
    }
  }

  console.log('Successfully completed fixing Vercel build trace paths!');
}

main();
