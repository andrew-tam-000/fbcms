import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import * as firebaseHelpers from '~/core/firebase/helpers';

export default compose(
    firebaseConnect([
        {
            type: 'once',
            path: 'pageContent/'
        },
        {
            type: 'once',
            path: 'templates/'
        }
    ]),
    connect(
        ({ firebase: { data: { pageContent, templates } }}, { match: { params: { template, id } } }) => {

            return {
                templates: _.keys(templates),
                fieldsByTemplate: _.reduce(
                    templates,
                    (agg, fields, template) => _.set(
                        agg,
                        template,
                        _.values(_.get(fields, 'fields'))
                    ),
                    {}
                )
            }
        },
        dispatch => ({
            createPage: ({pageData, metaData}) => {
                return firebaseHelpers.createPage({pageData, metaData});
            }
        })

    )
);

