// // Import the built-in 'fs' (File System) module
// // It allows us to read and write files
// const fs = require('fs');

/*
//--------------------------------FILES------------------------------//

//---------------Blocking, Synchronous way--------------------//
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

//---------------Non-Blocking, Asynchronous way--------------------//
// Read 'start.txt' asynchronously
// The content of start.txt will determine the next file to read
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {

    if(err) return console.log('ERROR!💥')

    // Read a file whose name comes from the content of start.txt
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
       console.log(data2); // Print the content of that file

       // Read another file 'append.txt'
       fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
          console.log(data3); // Print its content

          // Write a new file 'final.txt' combining data2 and data3
          fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
            console.log('Your file has been written 😁'); // Confirm writing
          })
        });
    });
});

// This line runs immediately, before any of the readFile callbacks
console.log('Will read file!');
*/

//------------------------------------SERVER---------------------------//
// Import the built-in 'http' module to create a web server
const http = require('http');
const path = require('path');

// Import the built-in 'url' module to handle URLs
const url = require('url');

// Create an HTTP server
// 'req' = request (what the client/browser asks for)
// 'res' = response (what the server sends back)
const server = http.createServer((req, res) => {

    // Log the requested URL path to the console
    console.log(req.url);

    // Store the request URL path in a variable (e.g. /overview or /product)
    const pathName = req.url;

    // Check which path the user requested and send the correct response
    if (pathName === '/' || pathName ==='/overview') {
        // If user visits /overview → send this response
        res.end('This is the OVERVIEW');

    } else if (pathName === '/product') {
        // If user visits /product → send this response
        res.end('This is the PRODUCT');

    } else {
        // For any other path → send "Page not found" with 404 status code
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

// Start the server and listen on port 8000
// This callback runs once when the server starts successfully
server.listen(8000, () => {
    console.log('Listening to requests on port 8000');
});