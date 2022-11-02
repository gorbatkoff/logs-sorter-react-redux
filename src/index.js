import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import App from './App';

const defaultState = {
  typeOfSearch: 'site',
  itemsCount: 0,
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_USER_SEARCH":
      return state;

    case "GET_COUNT_OF_ITEMS":
      return state.itemsCount;

    case "CHANGE_COUNT_OF_ITEMS":
      return { ...state, itemsCount: action.payload };

    default:
      return state;
  }
}


const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

