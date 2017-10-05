import React from 'react';
import { Route } from 'react-router-dom';

import Create from '~/core/templates/Create';
import create from '~/core/connectors/create';

import Edit from '~/core/templates/Edit';
import edit from '~/core/connectors/edit';

import Homepage from '~/core/templates/Homepage';
import homepage from '~/core/connectors/homepage';

const ConnectedCreate = create(Create);
const ConnectedEdit = edit(Edit);
const ConnectedHomepage = homepage(Homepage);

const Routes = () => ([
    <Route key='create' exact path='/create' component={ConnectedCreate}/>,
    <Route key='edit' exact path='/edit/:template/:id' component={ConnectedEdit}/>,
    <Route key='homepage' exact path='/' component={ConnectedHomepage}/>
]);


export default Routes;
