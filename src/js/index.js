import React from 'react';
import ReactDOM from 'react-dom';
import App from '~/core/index';
import Templates from '~/client/index';

const elem = document.createElement('div');
elem.setAttribute('id', 'react');
document.body.prepend(elem);

ReactDOM.render(
    <App/>,
    elem
);
