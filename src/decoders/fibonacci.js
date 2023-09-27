// Array to store fibonacci numbers.
let fib = [];

// Function to populate the fib array up to the given number
function populateFibArray(n) {
    fib=[1,2];
    while (fib.length <= n) {
        const nextFib = fib[fib.length - 1] + fib[fib.length - 2];
        fib.push(nextFib);
    }
}

function fibonacciDecoding(codeword) {
    // Initialize variables
    let n = 0;

    for (let i = 0; i < codeword.length; i++) {
        if (codeword[i] === '1') {
            const index = i
            if (index === -1) {
                // Não há mais '1's no codeword, então é um stop bit inválido
                return 'Invalid Codeword';
            }
            populateFibArray(index); // Popula o array fib até o índice atual
            n += fib[index];
        }
    }

    return n;
}


// Function to decode the entire encoded stream
export function fibonacciDecompression(encodedStream) {
    let i = 1;
    // Decode the encoded stream
    let decodedStream = '';
    let startIndex = 0;
    for (i = 1; i < encodedStream.length; i++) {
        if (encodedStream[i] === '1' && encodedStream[i - 1] === '1') {
            const codeword = encodedStream.substring(startIndex, i);
            const decodedValue = fibonacciDecoding(codeword);
            if (decodedValue === -1) {
                // Invalid codeword, cannot decode
                return 'Invalid Codeword';
            }
            decodedStream += decodedValue + ' ';
            startIndex = i+1;
        }
    }
    return decodedStream.trim(); // Remove trailing space
}
