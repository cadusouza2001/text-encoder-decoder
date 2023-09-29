import { useEffect, useState } from 'react';
import { huffmanCompression } from './encoders/huffman';
import './App.css';
import { golombCompression } from './encoders/golomb';
import { fibonacciCompression } from './encoders/fibonacci';
import { fibonacciDecompression } from './decoders/fibonacci';
import { huffmanDecompression } from './decoders/huffman';
import { eliasGammaCompression } from './encoders/elias';
import { eliasGammaDecompression } from './decoders/elias';
import { golombDecompression } from './decoders/golomb';

function App() {

  const [inputText, setInputText] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [compressedText, setCompressedText] = useState('');
  const [decompressedText, setDecompressedText] = useState('');
  const [huffmanCodes, setHuffmanCode] = useState({});
  const [golombDivisor, setGolombDivisor] = useState(2);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  }

  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  }

  const handleCompression = () => {
    switch (selectedAlgorithm) {
      case 'huffman':
        let result = huffmanCompression(inputText);
        setCompressedText(result.encodedText);
        setHuffmanCode(result.code);
        break;
      case 'golomb':
        setCompressedText(golombCompression(inputText,golombDivisor).encodedStream);
        break;
      case 'fibonacci':
        setCompressedText(fibonacciCompression(inputText).toString());
        break;
      case 'eliasGamma':
        setCompressedText(eliasGammaCompression(inputText));
        break;
      default:
        break;
    }
  }

  const handleDecompression = () => {
    switch (selectedAlgorithm) {
      case 'huffman':
        let huffmanResult = huffmanCompression(inputText);
        setDecompressedText(huffmanDecompression(compressedText, huffmanResult.code));
        break;
      case 'golomb':
        setDecompressedText(golombDecompression(compressedText,golombDivisor));
        break;
      case 'fibonacci':
        setDecompressedText(fibonacciDecompression(compressedText));
        break;
      case 'eliasGamma':
        setDecompressedText(eliasGammaDecompression(compressedText).join(" "));
        break;
      default:
        break;
    }
  }

   useEffect(() => {
    handleDecompression();
  }, [compressedText]);
  

  return (
    <div className="App">
      <h1>Compressor de Texto</h1>
      <div>
        <label htmlFor="textArea">Insira o texto:</label>
        <textarea
          id="textArea"
          value={inputText}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      <div>
        <label htmlFor="algorithmSelect">Escolha o algoritmo:</label>
        <select
          id="algorithmSelect"
          value={selectedAlgorithm}
          onChange={(event) => handleAlgorithmChange(event)}
        >
          <option value="huffman">Huffman</option>
          <option value="golomb">Golomb</option>
          <option value="fibonacci">Fibonacci</option>
          <option value="eliasGamma">Elias Gamma</option>
        </select>
      </div>
      <button onClick={() => handleCompression()}>Comprimir</button>
      <div>
        <h2>Texto Comprimido:</h2>
        <p>{compressedText}</p>
      </div>
      <div>
  {selectedAlgorithm === 'huffman' && (
    <div>
      <h2>Codewords Huffman:</h2>
      <p>{JSON.stringify(huffmanCodes)}</p>
    </div>
  )}

  {selectedAlgorithm === 'golomb' && (
    <div>
      <label htmlFor="golombM">Valor de M (Golomb):</label>
      <input
        id="golombM"
        type="number"
        value={golombDivisor}
        onChange={(event) => setGolombDivisor(Number(event.target.value))}
      />
    </div>
  )}
</div>
      <div>
        <h2>Texto Descomprimido:</h2>
        <p>{decompressedText}</p>
      </div>
    </div>
  );
}

export default App;
