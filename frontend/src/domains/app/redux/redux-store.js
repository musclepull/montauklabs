import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import { NODE_ENV } from '../constants';
import montaukReducer from './reducer';

// for running tests in node environment instead of jsdom
export const history = NODE_ENV ? createMemoryHistory() : createBrowserHistory();

export function createMontaukStore(initialState = {}) {
    const reducer = montaukReducer(history);
    const middleware = composeWithDevTools(
        applyMiddleware(
            thunk,
            routerMiddleware(history),
        )
    );

    return createStore(reducer, initialState, middleware);
}
