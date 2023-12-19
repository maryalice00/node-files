const fs = require('fs');

function cat(path) {
  // Read the file asynchronously
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err.message}`);
    } else {
      // Print the contents of the file
      console.log(data);
    }
  });
}

// Get the file path from the command line arguments
const filePath = process.argv[2];

// Check if a file path is provided
if (!filePath) {
  console.error('Please provide a file path as a command line argument.');
} else {
  // Call the cat function with the specified file path
  cat(filePath);
}
