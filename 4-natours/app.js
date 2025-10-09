// File system module to read/write files
const fs = require('fs');

// Import Express package
const express = require('express');

// Create an Express application instance
// This app object will act as our server
const app = express();

// Middleware: Parses incoming JSON data into a usable JavaScript object in req.body
app.use(express.json());

// Read and parse the JSON file containing all tours data
// __dirname gives the current directory path
// fs.readFileSync() reads the file synchronously, and JSON.parse() converts it into a JavaScript object
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));


//------------------------Handle GET request---------------------------//
// Define a GET route for '/api/v1/tours' to get all tours
// When a client sends a GET request to this route, the server responds with all tours data
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({   // Send a JSON response with status code 200 (OK)
        status: 'success',    // Indicates that the request was successful
        results: tours.length, // Number of tours in the data
        data: {
            tours   // Actual tour data sent to the client
        }
    });
});


//-------------------Responding to URLs parameters---------------------//
// Define a GET route for '/api/v1/tours' to get all tours
// When a client sends a GET request to this route, the server responds specific tour
app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);   // req.params contains dynamic URL values, e.g., { id: '3' } for '/api/v1/tours/3'

    // Convert the 'id' URL parameter from a string to a number using '* 1'
    // Find the tour in the 'tours' array whose id matches the given id
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    // if (id > tours.length) {
    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({   // Send a JSON response with status code 200 (OK)
        status: 'success',    // Indicates that the request was successful
        data: {
            tour   // Actual tour data sent to the client
        }
    });
});


//------------------------Handle POST request--------------------------//
// Define a POST route for '/api/v1/tours' to create a new tour
// When a client sends data to this route, it can be accessed via req.body
// The new tour is added to the tours array and saved to the JSON file
app.post('/api/v1/tours', (req, res) => {
    // Generate a new ID based on the last tour
    const newId = tours[tours.length - 1].id + 1;

    // Create a new tour object combining the new ID and client data
    const newTour = Object.assign({ id: newId }, req.body);

    // Add the new tour to the tours array
    tours.push(newTour);

    // Write the updated tours array back to the JSON file
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
            // Send response after writing to the file
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour
                }
            });
        }
    );
});


//---------------------Handle Patch request----------------------------//
// Define a PATCH route for '/api/v1/tours/:id' to update a specific tour
app.patch('/api/v1/tours/:id', (req, res) => {

    // Check if the provided ID (from URL) is greater than the number of tours
    // If so, it is considered invalid
    if (req.params.id * 1 > tours.length) {
        // Send a 404 Not Found response with a failure message
        return res.status(404).json({
            status: 'fail',           // Status of the response
            message: 'Invalid ID'     // Message explaining the error
        });
    }

    // If the ID is valid, send a success response
    res.status(200).json({
        status: 'success',    // Indicates request was successful
        data: {
            tour: '<Updated tour here...>' // Placeholder for the updated tour data
        }
    });
});


//---------------------Handle Delete request---------------------------//
// Define a DELETE route for '/api/v1/tours/:id' to delete a specific tour
app.delete('/api/v1/tours/:id', (req, res) => {

    // Convert the ID from URL parameter to a number and check if it is valid
    // If ID is greater than the number of tours, it is invalid
    if (req.params.id * 1 > tours.length) {
        // Send a 404 Not Found response with a failure message
        return res.status(404).json({
            status: 'fail',  // Status of the response
            message: 'Invalid ID'   // Message explaining why it failed
        });
    }

    // If ID is valid, send a 204 No Content response indicating successful deletion
    res.status(204).json({
        status: 'success',   // Indicates the request was successful
        data: null   // No content is sent in the response body
    });
});


//------------------------Start the server-----------------------------//
// Define the port on which the server will listen
const port = 3000;
// Start the server and listen on the specified port
// Once the server starts, log a message to the console
app.listen(port, () => {
    console.log(`App running on ${port}....`);
});


//////////////////////////////  COMPLETED ///////////////////////////////