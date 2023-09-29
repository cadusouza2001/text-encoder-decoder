export function golombDecompression(encodedStream, m) {
    let currentIndex = 0; // Índice atual na stream
    let decodedValues = []; // Array para armazenar os valores decodificados

    while (currentIndex < encodedStream.length) {
        // Etapa 1: Ler o prefixo (quantidade de zeros até o stop bit)
        let zeroCount = 0;
        while (currentIndex < encodedStream.length && encodedStream[currentIndex] === '0') {
            zeroCount++;
            currentIndex++;
        }

        currentIndex++; // Pular o stop bit

        // Etapa 2: Ler o sufixo em binário
        let suffix = encodedStream.substr(currentIndex, Math.log2(m));
        currentIndex += Math.log2(m);

        // Converter o sufixo binário em um número inteiro
        let remainder = parseInt(suffix, 2);

        // Calcular o valor final
        let decodedValue = zeroCount * m + remainder;

        // Adicionar o valor decodificado ao array
        decodedValues.push(decodedValue);
    }

    // Converter os valores decodificados em uma string separada por espaços
    let decodedText = decodedValues.join(' ');

    return decodedText;
}
