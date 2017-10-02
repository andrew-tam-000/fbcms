import { createStore, compose, combineReducers } from 'redux';
import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase';
import firebaseApp from '~/core/firebase/index';

// Add Firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseStateReducer
});

const rrfConfig = { userProfile: 'users' } // react-redux-firebase config

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebaseApp, rrfConfig)
)(createStore);

const store = createStoreWithFirebase(rootReducer, {});

window.store = store;

export default store;
