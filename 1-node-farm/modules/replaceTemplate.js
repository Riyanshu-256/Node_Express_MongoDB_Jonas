// This module exports a function that replaces placeholders in an HTML template with actual product data.
// 'temp' is the HTML template string containing placeholders like {%PRODUCTNAME%}.
// 'product' is an object containing details like productName, image, price, nutrients, quantity, description, id, and organic.
// Each line replaces a specific placeholder in the template with the corresponding value from the product object.
// If the product is not organic, it replaces {%NOT_ORGANIC%} with the string 'not-organic' (useful for CSS classes or labels).
// Finally, it returns the updated HTML string with all placeholders filled in.


module.exports = (temp, product) => {
    if (!product) {
        console.error('Product is undefined!');
        return temp;
    }

    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic)
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output;
}
