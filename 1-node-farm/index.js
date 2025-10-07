// // Import the built-in 'fs' (File System) module
// // It allows us to read and write files
// const fs = require('fs');
;  
const url = require('url'); 

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
const http = require('http');  
const url = require('url'); 

const server = http.createServer((req, res) => {
    console.log(req.url);

    const pathName = req.url;

    // Check the request URL and send response accordingly
    if (pathName === '/overview') {
        res.end('This is the OVERVIEW');
    } else if (pathName === '/product') {
        res.end('This is the PRODUCT');
    } else {
        // Send 404 status code for any other route
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

// Listen on port 8000
server.listen(8000, () => {
    console.log('Listening to requests on port 8000');
});
