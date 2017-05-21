import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import injectTapEventPlugin from 'react-tap-event-plugin';

import rootReducer from './reducers/rootReducer';

import setTokenHeader from '../server/common/setTokenHeader';
import { loginUser } from './actions/actions';
import jwtDecode from 'jwt-decode';

import './styles/index.sass';

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);
if(localStorage.jwtToken) {
    setTokenHeader(localStorage.jwtToken);
    store.dispatch(loginUser(jwtDecode(localStorage.jwtToken)))
};


injectTapEventPlugin();

ReactDOM.render (
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('app')
);
