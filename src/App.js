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
import EncodingComponent from './components/encoding';
import DecodingComponent from './components/decoding';

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
      <EncodingComponent/>
      <DecodingComponent/>
    </div>
  );
}

export default App;
