import _ from 'lodash';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import history from '~/core/history';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import firebaseApp from '~/core/firebase/index';
import { diff } from 'deep-object-diff';

const middleware = routerMiddleware(history)

// Add Firebase to reducers
const rootReducer = combineReducers(
    {
        firebase: (state = {}, {type, payload }) => {
            const data = _.get(payload, 'data');
            switch (type) {
                case 'FIREBASE_UPDATE':
                    return _.merge(
                        {},
                        state,
                        data
                    );
                default:
                    return state;
            }
        },
        router: routerReducer
    },
);

export default initialState => {

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(middleware)
        )
    );

    // This is highliy inefficient.
    // We are watching the entire database,
    // and then diffing changes against our local store.
    // Bad idea. But very simple to implemetn
    firebaseApp
        .database()
        .ref()
        .on(
            'value',
            updatedSnapshot => {
                const updatedVal = updatedSnapshot.val();
                const partial = diff(store.getState().firebase, updatedVal);
                const partialWithUndefinedAsNull = compose(
                    JSON.parse,
                    partial => JSON.stringify(
                        partial,
                        (k, v) => _.isUndefined(v) ? null : v
                    )
                )(partial);

                store.dispatch(
                    {
                        type: 'FIREBASE_UPDATE',
                        payload: {
                            data: partialWithUndefinedAsNull
                        }
                    }
                );
            }
        )
    ;

    /*
     * stress test
    setInterval(
        () => {
            firebaseApp
                .database()
                .ref('/pages/-KvdtRrP7OZyW7Lf1FBq/')
                .set({
                    title: Math.random()
                })
            ;
        },
        50
    )
    */

    window.store = store;

    return store;

}
