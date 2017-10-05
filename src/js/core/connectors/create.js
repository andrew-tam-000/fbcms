import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as firebaseHelpers from '~/core/firebase/helpers';

export default compose(
    connect(
        ({ firebase: { pageContent, templates }}, { match: { params: { template, id } } }) => {

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

