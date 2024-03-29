import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/Store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ContextProvider from './context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
  <Provider store={store}>
  <ContextProvider>
    <App />
    </ContextProvider>
  </Provider>
  </React.StrictMode>
  </BrowserRouter>
);

