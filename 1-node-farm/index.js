// Import the built-in 'fs' (File System) module
// It allows us to read and write files
const fs = require('fs');

// Import the built-in 'http' module to create a web server
const http = require('http');

// Import the built-in 'url' module to handle URLs
const url = require('url');

const slugify = require('slugify');

// Import the replaceTemplate function from the './modules/replaceTemplate' file
const replaceTemplate = require('./modules/replaceTemplate');

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

// Read the file synchronously (blocking way)
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

// Convert JSON text to a JavaScript object
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, {lower : true}));

console.log(slugs);

// Create an HTTP server
// 'req' = request (what the client/browser asks for)
// 'res' = response (what the server sends back)
const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true);

    // OVERVIEW PAGE
    // Check which path the user requested and send the correct response
    if (pathname === '/' || pathname ==='/overview') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        
        // Create HTML for all product cards by replacing placeholders in the template
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');

        // Insert all product cards into the overview template
        const output = tempOverview.replace('{%PRODUCTS_CARDS%}', cardsHtml);

        // Send the final HTML page as a response to the browser
        res.end(output);


    // PRODUCT PAGE
    } else if (pathname === '/product') {
        
        // Set the HTTP response header to tell the browser we're sending HTML content
        res.writeHead(200, { 'Content-Type': 'text/html' });

        // Get the specific product data based on the 'id' from the query string
        const product = dataObj[query.id];

        // Replace placeholders in the product template with the actual product data
        const output = replaceTemplate(tempProduct, product);

        // If user visits /product → send this response
        res.end(output);
    
    // API
    // If the user visits '/api':
    // 1. Tell the browser "this is JSON data"
    // 2. Send the JSON content to the user
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data); // or res.end(JSON.stringify(dataObj));

    // NOT FOUND
    } else {
        // For any other path → send "Page not found" with 404 status code
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

// Start the server and listen on a configurable port
// Prefer PORT from environment, fallback to 8000
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Listening to requests on port ${PORT}`);
});