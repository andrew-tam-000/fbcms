import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';

export default compose(
    connect(
        ({ firebase: { pageContent, templates }}, { match: { params: { template, id } } }) => {
            const fields = _.get(templates, [template, 'fields']);
            const dataForPage = _.get(pageContent, id)

            return {
                pageContent: dataForPage,
                fields
            }
        }
    )
);

