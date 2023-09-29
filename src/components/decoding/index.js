import React, { useState } from 'react';
import { huffmanDecompression } from '../../decoders/huffman';
import { golombDecompression } from '../../decoders/golomb';
import { fibonacciDecompression } from '../../decoders/fibonacci';
import { eliasGammaDecompression } from '../../decoders/elias';


const DecodingComponent = () => {
  const [compressedText, setCompressedText] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [decompressedText, setDecompressedText] = useState('');
  const [huffmanCodes, setHuffmanCode] = useState({});
  const [golombDivisor, setGolombDivisor] = useState(2);


  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  }

  const handleDecompression = () => {
    switch (selectedAlgorithm) {
      case 'huffman':
        setDecompressedText(huffmanDecompression(compressedText, huffmanCodes));
        break;
      case 'golomb':
        setDecompressedText(golombDecompression(compressedText, golombDivisor));
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Pega o primeiro arquivo selecionado (pode adicionar validações adicionais)
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const fileContent = e.target.result; // Conteúdo do arquivo como uma string
        setCompressedText(fileContent);
      };
  
      reader.readAsText(file); // Lê o arquivo como texto
    }
  };
  

  return (
    <div>
      <h1>Compressor de Texto - Decodificação</h1>
      <div>
        <label htmlFor="compressedTextArea">Texto Comprimido:</label>
        <textarea
          id="compressedTextArea"
          value={compressedText}
          onChange={(event) => setCompressedText(event.target.value)}
        />
        <input type="file" accept=".txt" onChange={handleFileUpload} />

      </div>
      <div>
        <label htmlFor="decodingAlgorithmSelect">Escolha o algoritmo de Decodificação:</label>
        <select
          id="decodingAlgorithmSelect"
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
         {selectedAlgorithm === 'huffman' && (
        <div>
          <label htmlFor="customHuffmanCodes">Códigos Huffman (JSON):</label>
          <textarea
            id="customHuffmanCodes"
            
            onBlur={(event) => {
                try {
                  setHuffmanCode(JSON.parse(event.target.value || '{}'));
                } catch (error) {
                  console.error('Erro ao analisar o JSON de códigos Huffman:', error);
                  // Lide com o erro de análise JSON aqui, se necessário
                }
              }}
            placeholder="Insira os códigos Huffman em formato JSON"
          />
        </div>
      )}
      <button onClick={() => handleDecompression()}>Descomprimir</button>
      <div>
        <h2>Texto Descomprimido:</h2>
        <p>{decompressedText}</p>
      </div>
    </div>
  );
}

export default DecodingComponent;
