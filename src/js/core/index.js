import React from 'react';

import {
    Provider,
    connect
} from 'react-redux';

import store from '~/core/redux/store';

import Drawer from 'material-ui/Drawer';
import ToolBar from 'material-ui/ToolBar';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, {ListItem} from 'material-ui/List';




import Edit from '~/core/components/Edit';
import edit from '~/core/connectors/edit';

import Homepage from '~/core/components/Edit';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

const MainContent = () => ([
    <Route exact path='/' component={connect(...edit)(Edit)}/>
]);

const App = () => (
    <Provider store={store}>
        <Router>
            <div>
                <AppBar>
                    <Toolbar>
                        Name
                    </Toolbar>
                </AppBar>
                <Drawer
                    type='permanent'
                >
                    <List>
                        <ListItem>
                            <Link to='edit'>
                                Edit
                            </Link>
                        </ListItem>
                    </List>
                </Drawer>
                <MainContent/>
            </div>
        </Router>
    </Provider>
);

export default App;
