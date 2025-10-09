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
};

// getDogPic: an asynchronous function that reads a dog breed from a file,
// fetches a random image for that breed from the Dog CEO API, and saves the image URL to a file
const getDogPic = async () => {
  try {
    // Read the dog breed from 'dog.txt' asynchronously
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    // Make an HTTP GET request to fetch a random image for the breed
    const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map(el => el.body.message);
    console.log(imgs);
    

    // Save the dog image URL to 'dog-img.txt' asynchronously
    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved to file!');
  } catch (err) {
    // Catch and log any errors that occur during the process
    console.log(err);
    throw(err);
  }
  return '2: READY 🐶';
};

// This is an Immediately Invoked Async Function Expression (IIAFE)
// It allows us to use async/await at the top level without creating a named function
(async () => {
  try {
    // Log the start of the process
    console.log('1: Will get dog pics!');

    // Call the async function getDogPic() and wait for it to complete
    const x = await getDogPic();

    // Log the returned value (if any) from getDogPic()
    console.log(x);

    // Log that the process is done
    console.log('3: Done getting dog pics!');
  } catch (err) {
    // Catch and log any errors that happen during the entire async operation
    console.log('ERROR 💥');
  }
})();


/*
console.log('1: Will get dog pics!');
// Call the async function to execute the process
getDogPic().then(x => {
  console.log(x);  
  console.log('3: Done getting dog pics!');
}).catch(err => {
  console.log('ERROR 💥');
});
*/

/*
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

      return writeFilePro('dog-img.txt', res.body.message);

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
    });
*/
