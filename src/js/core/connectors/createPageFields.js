import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { push } from 'react-router-redux';
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
        ({ firebase: { data: { pageContent, templates } }}, { templateName }) => {

            const pageFields = _.get(templates, [templateName, 'fields']);

            return {
                pageFields
            }
        },
        (dispatch) => ({
            // If we have no page id, its a create page action
            onSubmit: ({pageData, metaData}) => firebaseHelpers.createPage({pageData, metaData}),
            onSubmitSuccess: () => setTimeout(() => dispatch(push('/'), 500))
        })
    )
);

