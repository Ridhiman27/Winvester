import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { theme } from './theme.ts'
import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
