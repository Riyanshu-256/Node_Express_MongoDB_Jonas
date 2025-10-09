// Importing required modules: 'fs' for file system operations and 'superagent' for making HTTP requests
const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');

// readFilePro: a function that returns a Promise to read a file asynchronously
// Takes a 'file' path as input
// Uses fs.readFile to read the file
// If an error occurs (file not found, etc.), the Promise is rejected with an error message
// If reading succeeds, the Promise is resolved with the file data
const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 😒')
      resolve(data);
    });
  });
};

// How Promises work and how to build them
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('I could not find that file 😒');
      resolve('success');
    })
  })
}

// Reading the content of 'dog.txt' asynchronously
readFilePro(`${__dirname}/dog.txt`).then(data => {
    // Log the breed read from the file
  console.log(`Breed: ${data}`);

  // Make a http GET request to the Dog CEO API to fetch a random image for the breed and .then() → used to handle successful case
return  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
}).then(res => {

      // Log the URL of the random dog image
      console.log(res.body.message);

      return writeFilePro('dog-img.txt', res.body.message)

      // // Save the dog image URL to 'dog-img.txt' asynchronously
      // fs.writeFile('dog-img.txt', res.body.message, err => {
      //   if (err) return console.log(err.message);
      //   // Confirm that the image URL was successfully saved
      //   console.log('Random dog image saved to file!');
      // });
    })
  
    // .then() → used to handle successful case
    .then(() => {
      console.log('Random dog image saved to file!');
    })

    // used to handle errors that occur in a Promise chain or .catch() → used to handle rejected case
    .catch(err => {
        console.log(err);
    })
