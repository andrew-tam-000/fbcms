import { compose } from 'redux';
import { connect } from 'react-redux';

export default compose(
    connect(
        ({ firebase: { pages }}) => ({ pages })
    )
);
