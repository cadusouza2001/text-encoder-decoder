export function eliasGammaDecompression(codeSequence) {
    if (codeSequence === "1") {
        return [1];
    }

    const codes = splitEliasGammaCode(codeSequence);
    const decodedValues = [];

    for (const code of codes) {
        let numZeros = 0;
        while (code[numZeros] === "0") {
            numZeros++;
        }

        const suffixCode = code.slice(numZeros + 1);
        const value = parseInt("1" + suffixCode, 2);  // Calcula o valor a partir do sufixo em binário
        decodedValues.push(value);
    }

    return decodedValues;
}

function splitEliasGammaCode(codeSequence) {
    const codes = [];          // Array para armazenar os códigos Elias-Gamma separados.
    let currentCode = "";      // Variável para construir o código atual sendo processado.
    let zeroCount = 0;         // Contador para contar os zeros no prefixo.
    let num = 0;               // Variável de índice para percorrer a sequência de código.

    while (num < codeSequence.length) {
        if (codeSequence[num] === '0') {
            zeroCount += 1;               // Conta os zeros no prefixo.
            currentCode += codeSequence[num]; // Adiciona o bit atual ao código em construção.
        } else if (codeSequence[num] === '1') {
            if (zeroCount > 0) {
                for (let k = 0; k < zeroCount + 1; k++) {
                    if (num >= codeSequence.length) {
                        throw new Error("Código Elias-Gamma incompleto no final da sequência.");
                    }
                    currentCode += codeSequence[num];  // Adiciona os próximos bits ao código.
                    num += 1;
                }
                zeroCount = 0;
                codes.push(currentCode);  // Adiciona o código completo à lista.
                currentCode = "";         // Limpa o código atual.
                continue;
            } else {
                currentCode += codeSequence[num];  // Adiciona o bit atual ao código em construção.
            }
            codes.push(currentCode);  // Adiciona o código completo à lista.
            currentCode = "";         // Limpa o código atual.
        }
        num += 1;
    }

    return codes;
}