import React from 'react';

import {
    Provider,
    connect
} from 'react-redux';

import store from '~/core/redux/store';

import Edit from '~/core/components/Edit';
import edit from '~/core/connectors/edit';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

const App = () => (
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path='/' component={connect(...edit)(Edit)}/>
            </div>
        </Router>
    </Provider>
);

export default App;
