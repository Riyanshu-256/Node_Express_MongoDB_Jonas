const app = require('./app');

// Define the port on which the server will listen
const port = 3000;
// Start the server and listen on the specified port
// Once the server starts, log a message to the console
app.listen(port, () => {
    console.log(`App running on ${port}....`);
});