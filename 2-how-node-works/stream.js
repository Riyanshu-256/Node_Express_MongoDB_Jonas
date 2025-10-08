const fs = require('fs');
const server = require("http").createServer();

server.on("request", (req, res) => {
    // //Solution 1
    // fs.readFileSync("test-file.txt", (err, data) => {
    //     if (err) console.log(err);
    //     res.end(data);
    // });

    // //Solution 2: Streams
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // })
    // readable.on('end', () => {
    //     res.end();
    // })
    // readable.on('error', err => {
    //     res.write(err);
    //     res.statusCode = 500;
    //     res.end('File not found');
    // });

    //Solution 3
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);  // pipe → Connect readable stream to writable stream
    // readableSource.pipe(WrittenableDest)
});

server.listen(8000, () => {
    console.log("Listening.....")
})