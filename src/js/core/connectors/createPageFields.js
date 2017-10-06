import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as firebaseHelpers from '~/core/firebase/helpers';

export default compose(
    connect(
        ({ firebase: { pageContent, templates }}, { templateName }) => {

            const pageFields = _.get(templates, [templateName, 'fields']);
            const hasUrl = _.get(templates, [templateName, 'hasUrl']);

            return {
                pageFields,
                hasUrl
            }
        },
        (dispatch) => ({
            // If we have no page id, its a create page action
            onSubmit: ({pageData, metaData}) => firebaseHelpers.createPage({pageData, metaData}),
            onSubmitSuccess: () => setTimeout(() => dispatch(push('/'), 500))
        })
    )
);

