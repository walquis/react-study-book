import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import OneChanceButton from './OneChanceButton';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//ReactDOM.render(  // This is no longer supported as of React 18
  <React.StrictMode>
    <OneChanceButton />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
