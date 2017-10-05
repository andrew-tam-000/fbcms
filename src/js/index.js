import React from 'react';
import ReactDOM from 'react-dom';
import App from '~/core/index';
import Templates from '~/client/index';
import firebaseApp from '~/core/firebase/index';
import store from '~/core/redux/store';

const elem = document.createElement('div');
elem.setAttribute('id', 'react');
document.body.prepend(elem);

firebaseApp
    .database()
    .ref()
    .once('value')
    .then(
        baseSnapshot => (
            render(
                App,
                elem,
                {
                    store: store({
                        firebase: baseSnapshot.val()
                    })
                }
            )
        )
    )


function render(Component, elem, props) {
    ReactDOM.render(
        <Component {...props}/>,
        elem
    );
}

module.hot.accept('./core/index.js', function() {
    render(require('./core/index.js').default, elem);
});
