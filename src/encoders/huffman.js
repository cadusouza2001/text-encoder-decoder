export function huffmanCompression(inputText) {
    class Node {
        constructor(freq, char = null) {
            this.freq = freq;
            this.char = char;
            this.left = null;
            this.right = null;
        }
    }

    function buildHuffmanTree(freqMap) {
        const heap = Object.entries(freqMap).map(([char, freq]) => new Node(freq, char));
        heap.sort((a, b) => a.freq - b.freq);

        let firstRun = true;

        while (heap.length > 1) {
            let left = heap.shift();
            let right = heap.shift();

            if (firstRun) {
                firstRun = false;
                [left, right] = [right, left];
            }

            const parent = new Node(left.freq + right.freq);
            parent.left = left;
            parent.right = right;
            heap.push(parent);
            heap.sort((a, b) => a.freq - b.freq);
        }

        return heap[0];
    }

    function buildHuffmanCodes(root) {
        const codes = {};
        const stack = [[root, ""]];

        while (stack.length > 0) {
            const [node, code] = stack.pop();
            if (node.char !== null) {
                codes[node.char] = code;
            }
            if (node.left) {
                stack.push([node.left, code + "0"]);
            }
            if (node.right) {
                stack.push([node.right, code + "1"]);
            }
        }

        return codes;
    }

    function huffmanEncode(text, code) {
        return [...text].map(char => code[char]).join("");
    }

    function huffmanDecode(encodedText, root) {
        const decodedText = [];
        let currentNode = root;

        for (const bit of encodedText) {
            if (bit === '0') {
                currentNode = currentNode.left;
            } else if (bit === '1') {
                currentNode = currentNode.right;
            }

            if (currentNode.char !== null) {
                decodedText.push(currentNode.char);
                currentNode = root;
            }
        }

        return decodedText.join("");
    }

    function calculateEntropy(freqMap) {
        const totalSymbols = Object.values(freqMap).reduce((acc, freq) => acc + freq, 0);
        const probabilities = Object.values(freqMap).map(freq => freq / totalSymbols);
        const entropy = -probabilities.reduce((acc, p) => acc + (p > 0 ? p * Math.log2(p) : 0), 0);
        return entropy;
    }

    const freqMap = {};
    for (const char of inputText) {
        freqMap[char] = (freqMap[char] || 0) + 1;
    }

    const sortedFreqMap = Object.fromEntries(
        Object.entries(freqMap).sort((a, b) => b[1] - a[1])
    );

    const tree = buildHuffmanTree(sortedFreqMap);
    const code = buildHuffmanCodes(tree);

    const encodedText = huffmanEncode(inputText, code);
    const entropy = calculateEntropy(freqMap);
    const decodedText = huffmanDecode(encodedText, tree);

    return { encodedText, code, entropy, decodedText };
}