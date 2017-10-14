import { connect } from 'react-redux';
import * as firebaseHelpers from '~/core/firebase/helpers';

export default connect(
    null,
    dispatch => ({
        uploadImageToFirebase: fileObj => firebaseHelpers.uploadImage(fileObj),
        convertPathToUrl: path => firebaseHelpers.getImagePathFromRefPath(path),
    })
)
