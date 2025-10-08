// class Calculator {
//   add(a, b) {
//     return a + b;
//   }

//   multiply(a, b) {
//     return a * b;
//   }

//   divide(a, b) {
//     return a / b;
//   }
// }

// Export a class (so it can be used in another file)
module.exports = class {
  
  // Method to add two numbers
  add(a, b) {
    return a + b;
  }

  // Method to multiply two numbers
  multiply(a, b) {
    return a * b;
  }

  // Method to divide two numbers
  divide(a, b) {
    return a / b;
  }
};
