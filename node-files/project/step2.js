const fs = require('fs');
const axios = require('axios');

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

function webCat(url) {
  // Fetch the content of the URL using axios
  axios.get(url)
    .then(response => {
      // Print the content of the URL
      console.log(response.data);
    })
    .catch(error => {
      // Print the error if fetching the URL fails
      console.error(`Error fetching ${url}:\n  ${error.message}`);
    });
}

// Get the command line arguments
const arg = process.argv[2];

// Check if a command line argument is provided
if (!arg) {
  console.error('Please provide a file path or URL as a command line argument.');
} else {
  // Determine whether the argument is a file path or a URL and call the appropriate function
  if (arg.startsWith('http://') || arg.startsWith('https://')) {
    // If the argument is a URL, call webCat
    webCat(arg);
  } else {
    // If the argument is a file path, call cat
    cat(arg);
  }
}
