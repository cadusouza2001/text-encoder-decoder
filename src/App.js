import { useEffect, useState } from 'react';
import { huffmanCompression } from './encoders/huffman';
import './App.css';
import { golombCompression } from './encoders/golomb';
import { fibonacciCompression } from './encoders/fibonacci';
import { fibonacciDecompression } from './decoders/fibonacci';
import { huffmanDecompression } from './decoders/huffman';
import { eliasGammaCompression } from './encoders/elias';
import { eliasGammaDecompression } from './decoders/elias';

function App() {

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  }

  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  }

  const handleCompression = () => {
    switch (selectedAlgorithm) {
      case 'huffman':
        setCompressedText(huffmanCompression(inputText).encodedText);
        break;
      case 'goulomb':
        setCompressedText(golombCompression(inputText).encodedStream);
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
      // case 'goulomb':
      //   setDecompressedText(golombCompression(inputText).decodedStream);
      //   break;
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

 

  const [inputText, setInputText] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [compressedText, setCompressedText] = useState('');
  const [decompressedText, setDecompressedText] = useState('');

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
          <option value="goulomb">Goulomb</option>
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
        <h2>Texto Descomprimido:</h2>
        <p>{decompressedText}</p>
      </div>
    </div>
  );
}

export default App;
