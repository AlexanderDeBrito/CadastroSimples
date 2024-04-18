import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import  GlobalStyle  from './Styles/global'
import  Routering  from './Routes/Routes'
import registerServiceWorker from './registerServiceWorker';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyle />       
        <Routering />
    </React.StrictMode>
);


registerServiceWorker();
