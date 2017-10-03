import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import firebase from '~/core/firebase/index';
const database = firebase.database();

const onChange = pageId => e => {
    const val = e.target.value;
    const fieldName = e.target.getAttribute('id');

    database.ref(`pageContent/${pageId}/${fieldName}`).set(val);
    database.ref(`pageContent/${pageId}/lastModified`).set(new Date().toISOString());
};

const ConnectedTextField = connect(
    null,
    (dispatch, { pageId } ) => ({
        onChange: e => onChange(pageId)(e)
    })
)(TextField);

const Edit = ({pageContent, fields, match: {params: {id}}}) => ([
    'Preview',
    ..._.map(
        fields,
        ({ id: fieldName, type}) => {

            const Component = getComponentForType(type);

            return (
                <Component
                    id={fieldName}
                    label={fieldName}
                    value={_.get(pageContent, fieldName) }
                    pageId={id}
                />
            )
        }
    )
]);

 export default Edit;

function getComponentForType(type) {
    return type == 'text' ? (
        ConnectedTextField
    ) : (
        'div'
    );
};

