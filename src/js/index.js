import React from 'react';
import ReactDOM from 'react-dom';
import App from '~/core/index';
import Templates from '~/client/index';

const elem = document.createElement('div');
elem.setAttribute('id', 'react');
document.body.prepend(elem);

render(
    App,
    elem
);

function render(Component, elem) {
    ReactDOM.render(
        <Component/>,
        elem
    );
}

module.hot.accept('./core/index.js', function() {
    render(require('./core/index.js').default, elem);
});
