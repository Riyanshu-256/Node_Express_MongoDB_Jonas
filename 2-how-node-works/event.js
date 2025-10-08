// Import required modules
const EventEmitter = require('events'); // For creating and handling events
const http = require('http');           // For creating an HTTP server

//-------------------- EVENTS --------------------//

// Create a custom class that extends EventEmitter
class Sales extends EventEmitter {
    constructor() {
        super(); // Call parent constructor
    }
}

// Create an instance or specific copy or object of EventEmitter
const myEmitter = new EventEmitter();

// Register event listeners for 'newSale' event
myEmitter.on('newSale', () => {
    console.log('There was new sale'); // First listener
});

myEmitter.on('newSale', () => {
    console.log("Customer name: Riyanshu"); // Second listener
});

myEmitter.on('newSale', stock => {
    console.log(`There are now ${stock} items left in stock.`); // Third listener that takes an argument
});

// Emit the 'newSale' event with an argument (stock = 9)
// All three listeners will be called in the order they were registered
myEmitter.emit("newSale", 9);

//-------------------- HTTP SERVER --------------------//

// Create an HTTP server instance
const server = http.createServer();

// Register an event listener for incoming requests
server.on("request", (req, res) => {
    console.log("Request received!");
    console.log(req.url);   // Log the requested URL
    res.end("Request received!"); // Send response back to the client
});

// You can register multiple listeners for the same event
server.on("request", (req, res) => {
    console.log("Another request 😊"); // This also runs for every request
});

// Listen for the 'close' event when server is closed
server.on("close", () => {
    console.log("Server closed");
});

// Start the server on port 8000 and run the callback once the server is ready
server.listen(8000, () => {
    console.log("Waiting for response......"); // Server is now listening for requests
});
