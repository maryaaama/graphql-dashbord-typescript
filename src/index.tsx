import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {AppProvider} from '@shopify/polaris';
import en from "@shopify/polaris/locales/en.json";
// @ts-ignore
import reportWebVitals from './reportWebVitals';
import '@shopify/polaris/build/esm/styles.css';





ReactDOM.render(
  <AppProvider  i18n={en}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </AppProvider>,

  document.getElementById("root"),
);

reportWebVitals();
