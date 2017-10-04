import React, { Component } from 'react';
import _ from 'lodash';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText } from 'material-ui/List';
import ReactDOM from 'react-dom';
import { getComponentForType, getDataFromForm } from '~/core/helpers/index';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

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
                        _.map(
                            ['title', 'slug'],
                            key => (
                                <div>
                                    <TextField
                                        inputRef={ ref => this[key] = ref }
                                        name={key}
                                        placeholder={key}
                                    />
                                </div>
                            )
                        ),
                        <form ref={ form => this.form = form }>
                            {
                                _.map(
                                    _.get(fieldsByTemplate, this.state.selectedTemplate),
                                    ({ id: fieldId, type }) => {
                                        const Component = getComponentForType(type);
                                        return (
                                            <div>
                                                <Component
                                                    name={fieldId}
                                                    placeholder={fieldId}
                                                />
                                            </div>
                                        );
                                    }
                                )
                            }
                            <Button
                                onClick={ e => (
                                    createPage({
                                        pageData: getDataFromForm(this.form),
                                        metaData: {
                                            title: this.title.value,
                                            template: this.state.selectedTemplate,
                                            slug: this.slug.value
                                        }
                                    })
                                        .then( () => history.push('/'))
                                )}
                                raised
                                color='primary'
                            >
                                Create page
                            </Button>
                        </form>
                    ]) : (
                        null
                    )
                }
            </div>
        );
    }
};

export default Create;
