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
                ({name, id, template}) => (
                    <ListItem>
                        <Link to={`/edit/${template}/${id}`}>
                            { name }
                        </Link>
                    </ListItem>
                )
            )
        }
    </List>
);

export default Homepage;
