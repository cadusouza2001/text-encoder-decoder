import { useState } from 'react';
import { huffmanCompression } from './encoders/huffman';
import './App.css';
import { golombCompression } from './encoders/golomb';
import { fibonacciEncode } from './encoders/fibonacci';

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
        console.log(huffmanCompression(inputText));
        break;
      case 'goulomb':
        setCompressedText(golombCompression(inputText).encodedStream);
        console.log(golombCompression(inputText));
        break;
      case 'fibonacci':
        setCompressedText(fibonacciEncode(inputText).toString());
        console.log(fibonacciEncode(inputText));
        break;
      default:
        break;
    }
  }

  const [inputText, setInputText] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('huffman');
  const [compressedText, setCompressedText] = useState('');
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
        </select>
      </div>
      <button onClick={() => handleCompression()}>Comprimir</button>
      <div>
        <h2>Texto Comprimido:</h2>
        <p>{compressedText}</p>
      </div>
    </div>
  );
}

export default App;
