import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase'

export default compose(
    firebaseConnect([
        {
            type: 'once',
            path: 'pageContent/'
        },
        {
            type: 'once',
            path: 'templates/'
        },
        {
            type: 'once',
            path: 'pages/'
        }
    ]),
    connect(
        ({ firebase: { data: { pageContent, templates } }}, { match: { params: { template, id } } }) => {
            const fields = _.get(templates, [template, 'fields']);
            const dataForPage = _.get(pageContent, id)

            return {
                pageContent: dataForPage,
                fields
            }
        }
    )
);

