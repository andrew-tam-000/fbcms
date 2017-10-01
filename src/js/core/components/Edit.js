import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

import firebase from '~/core/firebase/index';
const database = firebase.database();

const onTextChange = e => {
    const val = e.target.value;

    database.ref('pages/aklsjdls').set({
        test: e.target.value,
        lastModified: new Date().toISOString()
    });

};

const Edit = () => (
    [
        <TextField id='pageName' onChange={onTextChange}/>
    ]
);

 export default Edit;
