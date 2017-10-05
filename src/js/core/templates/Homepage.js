import React from 'react';
import _ from 'lodash';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import {
    Link
} from 'react-router-dom';

const Homepage = ({pages}) => (
    <List>
        {
            _.map(
                _.values(pages),
                ({title, id, template}) => (
                    <ListItem key={id}>
                        <Link to={`/edit/${template}/${id}`}>
                            { title }
                        </Link>
                    </ListItem>
                )
            )
        }
    </List>
);

export default Homepage;
