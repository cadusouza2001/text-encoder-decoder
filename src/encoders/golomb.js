function golombEncode(value, m) {
    // Calcula o quociente e o resto da divisão
    const quotient = Math.floor(value / m); // Prefixo (número de zeros)
    const remainder = value % m; // Sufixo (código do número em binário)

    // Codifica o quociente em binário com 0s
    const quotientCode = "0".repeat(quotient);

    // Calcula o tamanho do sufixo com base no log2 de m
    const numSuffixBits = Math.floor(Math.log2(m));

    // Codifica o resto em binário com tamanho fixo (numSuffixBits)
    const remainderCode = remainder.toString(2).padStart(numSuffixBits, '0');

    // Combina o quociente, o stop bit ("1") e o resto codificados
    const golombCode = quotientCode + "1" + remainderCode;

    return golombCode;
}

function golombDecode(golombCode, m) {
    // Encontre o índice do primeiro "1" no código
    const idx = golombCode.indexOf('1');

    if (idx === -1) {
        return 0; // Nenhum "1" encontrado, o valor é 0.
    }

    // O número de zeros no prefixo é o índice do primeiro "1"
    const numZeros = idx;

    // O tamanho do sufixo é dado por log2(m)
    const numSuffixBits = Math.floor(Math.log2(m));

    // O código do sufixo começa no índice do "1" após os zeros
    const suffixStartIdx = idx + 1;

    // O código do sufixo é o número de bits seguintes ao prefixo
    const suffixCode = golombCode.slice(suffixStartIdx, suffixStartIdx + numSuffixBits);

    // Converte o código do sufixo de binário para inteiro
    const remainder = parseInt(suffixCode, 2);

    // Calcule o valor final
    const value = numZeros * m + remainder;

    return value;
}

function calculateEntropy(probabilities) {
    const entropy = probabilities.reduce((acc, prob) => {
        const p = prob / probabilities.reduce((sum, p) => sum + p, 0);
        return acc - (p > 0 ? p * Math.log2(p) : 0);
    }, 0);
    return entropy;
}

export function golombCompression(inputText, m) {
    const symbolStream = inputText.split(' ').map(Number);
    const encodedStream = symbolStream.map(value => golombEncode(value, m));

    const probabilities = Array.from(new Set(encodedStream)).map(code => {
        return encodedStream.filter(c => c === code).length / encodedStream.length;
    });

    const entropy = calculateEntropy(probabilities);

    const decodedStream = encodedStream.map(code => golombDecode(code, m));
    const decodedText = decodedStream.join(' ');

    return { encodedStream: encodedStream.join(''), entropy, decodedText };
}
