// Import Express package
const express = require('express');

// Load 'morgan' to log info about each request in the console
const morgan = require('morgan');

// to access the file of tourRoutes and userRoutes
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Create an Express application instance/copy
// This app object will act as our server
const app = express();

// Use the 'morgan' middleware to log details about each request in the console
// The 'dev' format shows method, URL, status, response time, and more in a concise way
app.use(morgan('dev'));

// Middleware: Parses or convert incoming JSON data into a usable JavaScript object in req.body
app.use(express.json());

app.use(express.static(`${__dirname}/public`));


//------------------Creating our own middleware------------------------//

// Apply to each and every single request and define the middleware before all the route handler
app.use((req, res, next) => {
    console.log('Hello from the middleware 👋');
    next();
});

// This middleware runs for every request that comes to the server
app.use((req, res, next) => {

    // Add the current time to the request so we know when it was made
    req.requestTime = new Date().toISOString();

    // Move on to the next middleware or route
    next();
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
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
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
//----------- Refractoring Our Routes ⭢ Restructring your code to make it cleaner, more organized and easier to maintain ------------------//

// Function to get all tours
const getAllTours = (req, res) => {
    console.log(req.requestTime);
    // Send a JSON response with status code 200 (OK)
    res.status(200).json({
        status: 'success',        // Response status message
        requestedAt: req.requestTime,
        results: tours.length,    // Total number of tours
        data: {
            tours                 // Send all tour data
        }
    });
}

// Function to get a single tour by ID
const getTour = (req, res) => {
    console.log(req.params);       // Log URL parameters (e.g., { id: '2' })
    const id = req.params.id * 1;  // Convert id from string to number
    const tour = tours.find(el => el.id === id); // Find the tour with matching ID

    // If no tour found, return a 404 error
    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    // If found, send the tour data
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
}

// Function to create a new tour
const createTour = (req, res) => {
    // Create a new ID by adding 1 to the last tour’s ID
    const newId = tours[tours.length - 1].id + 1;

    // Merge new ID with data received from client (req.body)
    const newTour = Object.assign({ id: newId }, req.body);

    // Add the new tour to the tours array
    tours.push(newTour);

    // Save the updated tours data to the JSON file
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
            // Send response with status 201 (Created)
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour
                }
            });
        }
    );
}

// Function to update an existing tour
const updateTour = (req, res) => {
    // If ID is greater than the number of tours, return an error
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    // Otherwise, send a success response (placeholder data)
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    });
}

// Function to delete a tour
const deleteTour = (req, res) => {
    // If ID is invalid, send error response
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    // Send response with status 204 (No Content)
    res.status(204).json({
        status: 'success',
        data: null
    });
}


// Function to handle request for getting all users
const getAllUsers = (req, res) => {

    // Send a response with status 500 (means something is wrong)
    res.status(500).json({
        status: 'error', // Shows there is an error
        message: 'This route is not yet defined!' // Tells that this part is not made yet
    });
};

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet define!'
    });
};

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet define!'
    });
};

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet define!'
    });
};

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet define!'
    });
};



//-------------------------- ROUTES -----------------------------------//
// Handling routes individually
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);



// Create new router for tour and  and save it in this
const tourRouter = express.Router();
const userRouter = express.Router();

// Better way to handling routes as compaired to above
// Grouping routes using Express route chaining
tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTour);

tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser);

userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);
*/
// Connect this tourRouter and userRouter to the applications through middleware
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

/*
//------------------------Start the server-----------------------------//
// Define the port on which the server will listen
const port = 3000;
// Start the server and listen on the specified port
// Once the server starts, log a message to the console
app.listen(port, () => {
    console.log(`App running on ${port}....`);
});
*/

module.exports = app;


//////////////////////////////  COMPLETED ///////////////////////////////