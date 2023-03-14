import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import { ApolloProvider } from '@apollo/react-hooks';
import { AuthProvider } from './Contexts/authContext';
import client from './Contexts/client';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);