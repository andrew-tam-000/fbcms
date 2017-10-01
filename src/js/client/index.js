import React from 'react';
import _ from 'lodash';

import Default from '~/client/layouts/Default';

import Header from '~/client/components/Header';
import Footer from '~/client/components/Footer';

import Homepage from '~/client/templates/Homepage';

const allTemplates = _.reduce(
    [
        {
            template: 'homepage',
            component: Homepage
        }
    ],
    (agg, {template, Component}) => (
        _.set(
            agg,
            template,
            createTemplate(Component)
        )
    ),
    {}
);

export default allTemplates;

function createTemplate(Template) {
    return props => (
        <Default
            Body={Template}
            Header={Header}
            Footer={Footer}
            {...props}
        />
    )
};
