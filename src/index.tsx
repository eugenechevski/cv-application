import React from 'react';
import ReactDOM from 'react-dom/client';
import 'tw-elements';
import './index.css';
import App from './App';

document.querySelector('body')?.classList.add('h-[100vh]', 'bg-purple-200', 'font-Roboto');
document.querySelector('#root')?.classList.add('w-full', 'h-full');
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
