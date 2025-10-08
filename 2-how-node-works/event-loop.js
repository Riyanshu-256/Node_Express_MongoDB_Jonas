// Import the 'fs' module to handle file system operations
const fs = require('fs');

const crypto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

// Timer callback → executes after the timer expires (placed in the Timer Phase)
setTimeout(() => console.log("Timer 1 finished"), 0);

// setImmediate callback → executes after the current poll phase (Check Phase)
setImmediate(() => console.log("Immeditae 1 finished"));

// Asynchronously read a file → once done, callback goes to the Poll Phase
fs.readFile('text-file.txt', () => {
    console.log('I/O finished');
    console.log('----------------------------------');

    setTimeout(() => console.log("Timer 2 finished"), 0);
    setTimeout(() => console.log("Timer 3 finished"), 0);
    setImmediate(() => console.log("Immediate 2 finished"));

    // process.nextTick schedules a callback to run **immediately after the current operation**, before other I/O or timers
    process.nextTick(() => console.log('Procecc nextTick'));

    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
    console.log(Date.now() - start, 'Password is encrypted');

    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
    console.log(Date.now() - start, 'Password is encrypted');

    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
    console.log(Date.now() - start, 'Password is encrypted');

    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
    console.log(Date.now() - start, 'Password is encrypted');
});

// Top-level code → runs first, before any callbacks
console.log("Hello from the top-level code");
