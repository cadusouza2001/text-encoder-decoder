import React, { useState, useEffect } from 'react';
import { huffmanCompression } from '../../encoders/huffman';
import { golombCompression } from '../../encoders/golomb';
import { fibonacciCompression } from '../../encoders/fibonacci';
import { eliasGammaCompression } from '../../encoders/elias';

const EncodingComponent = () => {
  const [inputText, setInputText] = useState('ababbebcaaeaabaddaeccbeaaaeeedecaeaa');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [compressedText, setCompressedText] = useState('');
  const [huffmanCodes, setHuffmanCode] = useState({});
  const [golombDivisor, setGolombDivisor] = useState(4);

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
        setCompressedText(golombCompression(inputText, golombDivisor).encodedStream);
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

  useEffect(() => {
    handleCompression();
  }, [selectedAlgorithm, golombDivisor]);

  return (
    <div>
      <h1>Compressor de Texto - Codificação</h1>
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
      
      <button onClick={() => handleCompression()}>Comprimir</button>
      
      <div>
        <h2>Texto Comprimido:</h2>
        <p>{compressedText}</p>
      </div>
        
      {selectedAlgorithm === 'huffman' && (
          <div>
            <h2>Codewords Huffman:</h2>
            <p>{JSON.stringify(huffmanCodes)}</p>
          </div>
        )}
      
    </div>
  );
}

export default EncodingComponent;
