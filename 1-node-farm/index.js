// Import the built-in 'fs' (File System) module
// It allows us to read and write files
const fs = require('fs');

// Read the content of 'input.txt' file as text
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// Log the file content to the console
console.log(textIn);

// Create a new text using the content from input.txt and current date/time
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

// Write the new text into 'output.txt' file (creates or replaces the file)
fs.writeFileSync('./txt/output.txt', textOut);

// Print message after file is written
console.log('File written');
