import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App/App'; // Ensure you are importing named export 'App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
