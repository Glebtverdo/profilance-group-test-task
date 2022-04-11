import * as ReactDOMClient from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";
import React from 'react';
import App from './App';
import "./index.sass";
import {setupStore} from "./store/index";
import {Provider} from "react-redux";

const container = document.getElementById('root') as Element
const root = ReactDOMClient.createRoot(container)
const store = setupStore();

root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);

