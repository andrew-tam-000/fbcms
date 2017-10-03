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


const store = createStoreWithFirebase(rootReducer, {
    test: {
        wow: 'one'
    },
    firebase: {
        data: {
            pages: {
                asd: {
                    id: 'asd',
                    name: 'Page name homepage',
                    template: 'standard'
                }

            },
            templates: {
                standard: {
                    fields: {
                        content: {
                            id: 'content',
                            type: 'text'
                        },
                        date: {
                            id: 'date',
                            type: 'text'
                        },
                        title: {
                            id: 'title',
                            type: 'text'
                        }
                    }
                }
            },
            pageContent: {
                asd: {
                    content: 'Test content',
                    date: '201701323',
                    title: 'This is a test titel'
                }
            }
        }
    }
});

window.store = store;

export default store;
