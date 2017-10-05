import React, { Component } from 'react';
import _ from 'lodash';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText } from 'material-ui/List';
import ReactDOM from 'react-dom';
import { getComponentForType, getDataFromForm } from '~/core/helpers/index';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import PageFields from '~/core/components/PageFields';
import createPageFields from '~/core/connectors/createPageFields';

const ConnectedPageFields = createPageFields(PageFields);

class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showTemplateMenu: false,
            selectedTemplate: '',
        };

        this.openTemplateMenu = this.openTemplateMenu.bind(this);
        this.closeTemplateMenu = this.closeTemplateMenu.bind(this);
        this.setTemplate= this.setTemplate.bind(this);
    }

    setTemplate(selectedTemplate) {
        this.setState({ selectedTemplate });
        this.closeTemplateMenu();
    }

    openTemplateMenu() {
        this._toggleTemplateMenu(true);
    }

    closeTemplateMenu() {
        this._toggleTemplateMenu(false);
    }

    _toggleTemplateMenu(force) {
        this.setState({
            showTemplateMenu: !_.isUndefined(force) ? force : !!this.state.showTemplateMenu
        });
    }

    render() {
        const { templates, fieldsByTemplate, createPage, history } = this.props;
        return (
            <div>
                <List>
                    <ListItem
                        onClick={this.openTemplateMenu}
                        ref={ templateAnchor => this.templateAnchor = ReactDOM.findDOMNode(templateAnchor) }
                    >
                        <ListItemText
                            primary='Template'
                            secondary={this.state.selectedTemplate || 'Click here to select template'}
                        />
                    </ListItem>
                </List>
                <Menu
                    anchorEl={this.templateAnchor}
                    onRequestClose={this.closeTemplateMenu}
                    open={this.state.showTemplateMenu}
                >
                    {
                        _.map(
                            templates,
                            template => (
                                <MenuItem
                                    selected={this.state.selectedTemplate == template}
                                    key={template}
                                    onClick={ e => this.setTemplate(template)}
                                >
                                    { template }
                                </MenuItem>
                            )
                        )
                    }
                </Menu>
                {
                    this.state.selectedTemplate ? ([
                        <ConnectedPageFields
                            templateName={this.state.selectedTemplate}
                        />
                    ]) : (
                        null
                    )
                }
            </div>
        );
    }
};

export default Create;
