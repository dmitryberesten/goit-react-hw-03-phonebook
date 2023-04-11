import React from 'react';
import ReactDOM from 'react-dom/client'; //бібліотека, яка надає методи для рендерингу компонентів в DOM
import { App } from 'components/App';
import './index.css'; //підключення стилів

// рендеринг компоненту App в DOM
ReactDOM.createRoot(document.getElementById('root')).render(

  // StrictMode - компонент, який використовується для виявлення проблем в додатку
  <React.StrictMode>

    {/* App - компонент, який містить в собі всі інші компоненти */}
    <App />
  </React.StrictMode>
);
