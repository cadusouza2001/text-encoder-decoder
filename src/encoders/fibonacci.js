function generateFibonacciSequence(n) {
    const fibonacciSequence = [1, 2]; // Inicializa com os dois primeiros números de Fibonacci
    while (fibonacciSequence[fibonacciSequence.length - 1] <= n) {
        const nextFibonacci = fibonacciSequence[fibonacciSequence.length - 1] + fibonacciSequence[fibonacciSequence.length - 2];
        fibonacciSequence.push(nextFibonacci);
    }
    return fibonacciSequence.slice(0, -1); // Remove o último número, pois é maior que n
}

export function fibonacciEncode(n) {
    if (n === 0) {
        return ["0"]; // Caso especial para n = 0
    }

    const fibonacciSequence = generateFibonacciSequence(n);
    const encoding = [];
    for (let i = 0; i < fibonacciSequence.length; i++) {
        const fibonacciNumber = fibonacciSequence[i];
        if (n >= fibonacciNumber) {
            encoding.push("1" + "0".repeat(fibonacciNumber.toString(2).length - 1)); // Salva o número em binário com o stop bit
            n -= fibonacciNumber;
        } else {
            encoding.push("0"); // Bit de zero para indicar que o número não está presente
        }
    }

    return encoding;
}

export function fibonacciDecode(encoding) {
    const fibonacciNumbers = generateFibonacciSequence(encoding.length);
    let decodedValue = 0;

    for (let i = 0; i < encoding.length; i++) {
        const encodedNumber = encoding[i];
        if (encodedNumber === "0") {
            // Bit de zero, o número não está presente
            continue;
        }
        const fibonacciIndex = encodedNumber.indexOf("1");
        if (fibonacciIndex >= 0) {
            const fibonacciNumber = fibonacciNumbers[fibonacciIndex];
            decodedValue += fibonacciNumber;
        }
    }

    return decodedValue;
}
