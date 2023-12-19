import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Header from "./features/Header/Header.component";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <>
        <Header />
         <App />
    </>
);

