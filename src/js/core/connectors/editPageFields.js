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
            path: 'pages/'
        },
        {
            type: 'once',
            path: 'templates/'
        },
    ]),
    connect(
        ({ firebase: { data: { pageContent, templates, pages } }}, { pageId }) => {
            console.log(pages, pageContent);

            const template = _.get(pages, [pageId, 'template']);
            const pageFields = _.get(templates, [template, 'fields']);
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
                pageData
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

