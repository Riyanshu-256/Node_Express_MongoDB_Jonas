// Import the file system module to read/write files
const fs = require('fs')

// Read the tours JSON file synchronously and parse it into a JavaScript object/array
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

// Middleware to check if the tour ID in the URL is valid
const checkID = (req, res, next, val) => {
    // If ID is greater than or equal to the number of tours, return 404 error
    if (req.params.id * 1 >= tours.length) {
        return res.status(404).json({
            status: 'Failed...!', 
            err: `No data found for id:${val}`
        })
    }
    // Otherwise, continue to the next middleware or route handler
    next();
}

// Middleware to check if the request body has 'name' and 'price' properties
const checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'Fail',
            message: 'Missing name or price property...!'
        })
    }
    // Continue to the next middleware or route handler
    next();
}

// Handler to get all tours
const getAllTours = (req, res) => {
    res.status(200) // Set HTTP status code to 200 (OK)
    res.json({   // Send the response as JSON
        status: 'success',
        results: tours.length, // Total number of tours
        data: { tours },   // Send all tour data
    });
}

// Handler to create a new tour
const createTour = (req, res) => {
    const newId = tours.length // Assign new ID based on current length
    const newTour = Object.assign({id: newId}, req.body) // Merge ID with client data

    tours.push(newTour) // Add the new tour to the tours array

    // Write updated tours array to JSON file
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), 'utf-8', (err) => {
        res.status(201) // HTTP status code 201 (Created)
        res.json({   // Send the new tour in response
            status: 'Success',
            data: { newTour },
        });
    });
}

// Handler to get a single tour by ID
const getTour = (req, res) => {
    const id = req.params.id * 1 // Convert string ID from URL to number
    const tour = tours.find((element) => element.id === id) // Find tour by ID
    res.status(200) // HTTP status 200 (OK)
    res.json({   // Send the tour data in JSON
        status: 'Success',
        data: { tour },
    });
}

// Handler to update a tour (currently placeholder)
const updateTour = (req, res) => {
    res.status(200) // HTTP status 200 (OK)
    res.json({   // Send placeholder response
        status: 'Success',
        data: 'Updated tour here...!'
    });
}

// Handler to delete a tour (currently placeholder)
const deleteTour = (req, res) => {
    res.status(200) // HTTP status 200 (OK)
    res.json({   // Send response with null data
        status: 'Success',
        data: null,
    });  
}

// Export all the controller functions and middleware for use in router
module.exports = {
    getAllTours,
    getTour,
    updateTour,
    deleteTour,
    createTour,
    checkID,
    checkBody,
}
