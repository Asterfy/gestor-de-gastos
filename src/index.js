import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='title'>
      <h1>Bienvenido nuevamente, <span>Miguel</span></h1>
    </div>
    <div className='money-info'>
        <h2>Dinero total</h2>
        <h3>1850</h3>
    </div>
    <div className='registros-info'>
      {/* <h2>Historial de gastos e ingresos</h2> */}
    </div>
    <App />
  </React.StrictMode>
);
