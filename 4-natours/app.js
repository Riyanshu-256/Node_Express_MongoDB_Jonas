const fs = require('fs');

// Import the Express package
const express = require('express');

// Create an Express application instance
// This app object will act as our server
const app = express();

// // Define a GET route for the root URL ('/')
// // When someone accesses the root, the server responds with a JSON object
// app.get('/', (req, res) => {
//     res
//       .status(202) // Set HTTP status code to 202 (Accepted)
//       .json({      // Send a JSON response
//           mesaage: 'Hello from the server side!', // Custom message
//           app: 'Natours'   // App name
//       });
// });

// Read and parse the JSON file containing all tours data
// __dirname gives the current directory path
// fs.readFileSync() reads the file synchronously, and JSON.parse() converts it into a JavaScript object
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// Define a GET route for '/api/v1/tours'
// When a client sends a GET request to this route, the server responds with all tours data
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({   // Send a JSON response with status code 200 (OK)
        status: 'success',    // Indicates that the request was successful
        results: tours.length, // Number of tours in the data
        data: {
            tours             // Actual tour data sent to the client
        }
    });
});


// Define a POST route for the root URL ('/')
// When a POST request is made, the server sends a simple text response
app.post('/', (req, res) => {
    res.send('You can post this endpoint....');
});

// Define the port on which the server will listen
const port = 3000;
// Start the server and listen on the specified port
// Once the server starts, log a message to the console
app.listen(port, () => {
    console.log(`App running on ${port}....`);
});
