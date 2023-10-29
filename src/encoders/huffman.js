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
            heap.sort((a, b) => {
                //Se um dos nós for intermediário e ambos tiverem a mesma frequência, o nó intermediário deve ser colocado antes do nó folha
                if (a.char === null && b.char !== null && a.freq === b.freq) {
                    return -1;
                }
                if (a.char !== null && b.char === null && a.freq === b.freq) {
                    return 1;
                }
                return a.freq - b.freq;
            });
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

    return { encodedText, code };
}
