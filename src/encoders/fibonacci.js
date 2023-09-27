// Array to store fibonacci numbers.
let fib = [];

// Function to populate the fib array up to the given number
function populateFibArray(n) {
    fib.push(1);
    fib.push(2);
    while (fib[fib.length - 1] <= n) {
        const nextFib = fib[fib.length - 1] + fib[fib.length - 2];
        fib.push(nextFib);
    }
}

// Stores values in fib and returns index of
// the largest fibonacci number smaller than n.
export function largestFiboLessOrEqual(n) {
    if (fib.length === 0 || fib[fib.length - 1] < n) {
        populateFibArray(n);
    }

    let i;
    for (i = fib.length - 1; i >= 0; i--) {
        if (fib[i] <= n) {
            return i;
        }
    }
    return -1; // No fibonacci number smaller than or equal to n found
}

function fibonacciEncoding(n) {
    let index = largestFiboLessOrEqual(n);

    // Allocate memory for codeword
    let codeword = new Array(index + 3);

    // Index of the largest Fibonacci f <= n
    let i = index;

    while (n > 0) {
        // Mark usage of Fibonacci f (1 bit)
        codeword[i] = '1';

        // Subtract f from n
        n = n - fib[i];

        // Move to Fibonacci just smaller than f
        i = i - 1;

        // Mark all Fibonacci > n as not used (0 bit), progress backwards
        while (i >= 0 && fib[i] > n) {
            codeword[i] = '0';
            i = i - 1;
        }
    }

    // Additional '1' bit
    codeword[index + 1] = '1';

    // Join the array elements into a single string
    let string = codeword.join('');

    // Clear the fib array and codeword
    fib = [];
    codeword = [];

    // Return the codeword as a string
    return string;
}

export function fibonacciCompression(stream) {
    const numbers = stream.split(" ").map(Number); // Convert the sequence of numbers into an array of integers
    const maxNumber = Math.max(...numbers); // Find the largest number in the stream
    populateFibArray(maxNumber); // Populate the fib array up to the largest number
    const encodedStream = numbers.map(n => fibonacciEncoding(n)).join(""); // Encode each number and join into a single string

    // Clear the fib array
    fib = [];

    return encodedStream.replace(/\\u/g, ''); // Remove escape characters \u
}
