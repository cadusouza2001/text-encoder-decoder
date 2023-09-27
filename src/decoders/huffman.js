export function huffmanDecompression(encodedText, codeMap) {
    let decodedText = "";
    let currentCode = "";

    for (const bit of encodedText) {
        currentCode += bit;
        if (Object.values(codeMap).includes(currentCode)) {
            const foundKey = Object.keys(codeMap).find(key => codeMap[key] === currentCode);
            decodedText += foundKey;
            currentCode = "";
        }
    }

    return decodedText;
}
