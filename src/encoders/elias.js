function eliasGammaEncode(n) {
    if (n <= 0) {
        throw new Error("O valor a ser codificado deve ser maior que zero.");
    }

    const binaryN = n.toString(2);  // Converte o valor inteiro em binário
    const prefixZeros = "0".repeat(binaryN.length - 1);  // Calcula os zeros do prefixo

    return prefixZeros + binaryN;
}

export function eliasGammaCompression(inputSequence) {
    const numbers = inputSequence.split(" ").map(Number);
    const encodedSequence = numbers.map(eliasGammaEncode).join("");
    return encodedSequence;
}
