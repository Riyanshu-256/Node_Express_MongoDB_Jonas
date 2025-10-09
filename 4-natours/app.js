// Import the Express package
const express = require('express');

// Create an Express application instance
// This app object will act as our server
const app = express();

// Define a GET route for the root URL ('/')
// When someone accesses the root, the server responds with a JSON object
app.get('/', (req, res) => {
    res
      .status(202) // Set HTTP status code to 202 (Accepted)
      .json({      // Send a JSON response
          mesaage: 'Hello from the server side!', // Custom message
          app: 'Natours'   // App name
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
