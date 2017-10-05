import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase'

export default compose(
    firebaseConnect([
        {
            type: 'once',
            path: 'pages/'
        }
    ]),
    connect(
        ({ firebase: { data: { pages} }}) => {
            console.log(pages);
            return { pages };
        }
    )
);
