import React from 'react';
import _ from 'lodash';

import Default from '~/client/layouts/Default';
import Header from '~/client/components/Header';
import Footer from '~/client/components/Footer';

// Dynamically load all the templates into webpack
const templateContext = require.context('~/client/templates', false, /.js$/);

const allTemplates = _.reduce(
    templateContext.keys(),
    (agg, componentPath) => (
        _.set(
            agg,
            getTemplateKeyFromPath(componentPath),
            createTemplate(templateContext(componentPath).default)
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

function getTemplateKeyFromPath(componentPath) {
    const fileName = _.last(_.split( componentPath, '/'));
    const fileNameNoExtension = _.first(_.split(fileName, '.'));
    return _.lowerFirst(fileNameNoExtension);
}
