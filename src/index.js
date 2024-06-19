import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App'; // Importing App without curly braces

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);