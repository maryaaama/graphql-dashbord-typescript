import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {AppProvider} from '@shopify/polaris';
import en from "@shopify/polaris/locales/en.json";
// @ts-ignore
import reportWebVitals from './reportWebVitals';
import '@shopify/polaris/build/esm/styles.css';

const root = (ReactDOM as any).createRoot(document.getElementById('root'));
root.render(

  <AppProvider  i18n={en}>
     
       <App />
    
  </AppProvider>
);

reportWebVitals();
