const fs = require('fs').promises;
const axios = require('axios');

async function cat(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    console.log(data);
  } catch (err) {
    console.error(`Error reading ${path}:\n  ${err.message}`);
  }
}

async function catWrite(path, filename) {
  try {
    const data = await fs.readFile(path, 'utf8');
    await fs.writeFile(filename, data);
    console.log(`Data from ${path} has been written to ${filename}.`);
  } catch (err) {
    console.error(`Couldn't write ${filename}:\n  ${err.message}`);
  }
}

async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error(`Error fetching ${url}:\n  ${error.message}`);
  }
}

async function webCatWrite(url, filename) {
  try {
    const response = await axios.get(url);
    await fs.writeFile(filename, response.data);
    console.log(`Data from ${url} has been written to ${filename}.`);
  } catch (error) {
    console.error(`Couldn't write ${filename}:\n  ${error.message}`);
  }
}

async function processCommand() {
  const args = process.argv.slice(2);

  // Check if --out option is provided
  const outIndex = args.indexOf('--out');
  if (outIndex !== -1 && outIndex < args.length - 2) {
    const outputPath = args[outIndex + 1];
    const sourcePath = args[outIndex + 2];

    if (sourcePath.startsWith('http://') || sourcePath.startsWith('https://')) {
      await webCatWrite(sourcePath, outputPath);
    } else {
      await catWrite(sourcePath, outputPath);
    }
  } else if (args.length === 1) {
    const arg = args[0];
    if (arg.startsWith('http://') || arg.startsWith('https://')) {
      await webCat(arg);
    } else {
      await cat(arg);
    }
  } else {
    console.error('Invalid command. Please provide a file path or URL.');
  }
}

// Execute the script
processCommand();
