import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase'

export default compose(
    firebaseConnect([
        'pageContent/',
        'templates/'
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

