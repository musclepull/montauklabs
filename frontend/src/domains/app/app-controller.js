import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { createMontaukStore, history } from './redux/redux-store';
import MainSwitch from "./routing/main-switch";

const montaukStore = createMontaukStore();

function AppController() {
    function render() {
        ReactDOM.render(
            <Provider store={montaukStore}>
                <ConnectedRouter history={history}>
                    <MainSwitch />
                </ConnectedRouter>
            </Provider>,
            document.getElementById('home')
        );
    }

    render();
}

export default AppController;
