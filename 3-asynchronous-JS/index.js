// Importing required modules: 'fs' for file system operations and 'superagent' for making HTTP requests
const fs = require('fs');
const superagent = require('superagent');

// Reading the content of 'dog.txt' asynchronously
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  // Log the breed read from the file
  console.log(`Breed: ${data}`);

  // Make a http GET request to the Dog CEO API to fetch a random image for the breed
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`).then(res => {

      // Log the URL of the random dog image
      console.log(res.body.message);

      // Save the dog image URL to 'dog-img.txt' asynchronously
      fs.writeFile('dog-img.txt', res.body.message, err => {
        if (err) return console.log(err.message);
        // Confirm that the image URL was successfully saved
        console.log('Random dog image saved to file!');
      });
    })
    .catch(err => {
        console.log(err.message);
    })
});
