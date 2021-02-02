import React from 'react';
import { render } from 'react-dom';
import { ContextProvider } from './context/context';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import { store } from './redux/store';
import './index.scss';

render(
  <Router>
    <ContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ContextProvider>
  </Router>,
  document.getElementById('root'),
);
