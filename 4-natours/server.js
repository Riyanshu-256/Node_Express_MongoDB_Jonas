const dotenv = require('dotenv');
const app = require('./app');

// Load environment variables from config.env
dotenv.config({ path: './config.env' });

// Log specific environment variables (optional for debugging)
console.log('USERNAME: process.env.USERNAME');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('PASSWORD:', process.env.PASSWORD);

// Define the port (fallback to 3000 if not found)
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
