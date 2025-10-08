// This module exports a function that replaces placeholders in an HTML template with actual product data.
// 'temp' is the HTML template string containing placeholders like {%PRODUCTNAME%}.
// 'product' is an object containing details like productName, image, price, nutrients, quantity, description, id, and organic.
// Each line replaces a specific placeholder in the template with the corresponding value from the product object.
// If the product is not organic, it replaces {%NOT_ORGANIC%} with the string 'not-organic' (useful for CSS classes or labels).
// Finally, it returns the updated HTML string with all placeholders filled in.



// Creating a replaceTemplate Function that will replace items
module.exports = (temp, product) => {

     // Now replacing all the nicknames by the actual one by reading data from product.productDetails
     let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
     output = output.replace(/{%IMAGE%}/g, product.image);
     output = output.replace(/{%PRICE%}/g, product.price);
     output = output.replace(/{%FROM%}/g, product.from);
     output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
     output = output.replace(/{%QUANTITY%}/g, product.quantity);
     output = output.replace(/{%DESCRIPTION%}/g, product.description);
     output = output.replace(/{%ID%}/g, product.id);

     // For replacing the organic part we first need to check
     // If organic then change -->> Otherwise leave it likewise
     if (!product.organic) {
          output = output.replace(/{%NOT_ORGANIC%}/g, 'not-Organic');
     }
     // now returning the Replaced Html files
     return output;
}