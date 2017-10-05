import React from 'react';

import { Provider } from 'react-redux';

import { ConnectedRouter } from 'react-router-redux'

import Routes from '~/core/routes';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, {ListItem} from 'material-ui/List';
import history from '~/core/history';

import {
    HashRouter as Router,
    Link
} from 'react-router-dom';

const styles = {
    mainContainer: {
        display: 'flex'
    },
    appBar: {
        display: 'flex',
        position: 'relative'
    },
    contentContainer: {
        // TODO Fix this with flex box
        marginLeft: 200,
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    }
}

const App = ({store}) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div style={styles.mainContainer}>
                <Drawer
                    type='permanent'
                >
                    <List>
                        <ListItem>
                            <Link to='/'>
                                Home
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to='/create'>
                                Create Page
                            </Link>
                        </ListItem>
                    </List>
                </Drawer>
                <div style={styles.contentContainer}>
                    <AppBar style={styles.appBar}>
                        <Toolbar>
                            Name
                        </Toolbar>
                    </AppBar>
                    <Routes/>
                </div>
            </div>
        </ConnectedRouter>
    </Provider>
);

export default App;
