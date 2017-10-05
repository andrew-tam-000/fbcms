import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import PageFields from '~/core/components/PageFields';
import editPageFields from '~/core/connectors/editPageFields';

const ConnectedPageFields = editPageFields(PageFields);

const Edit = ({history, match: {params: {id}}}) => (
    <ConnectedPageFields
        pageId={id}
    />
);

 export default Edit;
