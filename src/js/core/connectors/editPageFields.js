import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as firebaseHelpers from '~/core/firebase/helpers';

export default compose(
    connect(
        ({ firebase: { pageContent, templates, pages }}, { pageId }) => {

            const template = _.get(pages, [pageId, 'template']);
            const pageFields = _.get(templates, [template, 'fields']);
            const hasUrl = _.get(templates, [template, 'hasUrl']);
            const pageMeta = _.get(pages, pageId);

            const pageData = _.assign(
                {},
                _.get(pageContent, pageId),
                {
                    title: _.get(pageMeta, 'title'),
                    slug:  _.get(pageMeta, 'slug'),
                }
            );

            return {
                pageFields,
                pageData,
                hasUrl
            }
        },
        (dispatch, {pageId}) => ({
            // If we have no page id, its a create page action
            onSubmit: ({pageData, metaData}) => firebaseHelpers.updatePage({
                pageData,
                metaData: _.assign({}, metaData, { pageId })
            }),
            onSubmitSuccess: () => dispatch(push('/'))
        })
    )
);

