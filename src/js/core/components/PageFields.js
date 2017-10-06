import React from 'react';
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField';
import { getComponentForType, getDataFromForm } from '~/core/helpers/index';
import Button from 'material-ui/Button';

let refs = {};
const PageFields = ({pageFields, pageData, templateName, onSubmit, onSubmitSuccess, hasUrl}) => {

    return ([
        _.map(
            ['title', 'slug'],
            key => (
                key == 'slug' && !hasUrl ? (
                    null
                ) : (
                    <div key={key}>
                        <TextField
                            inputRef={ ref => refs[key] = ref }
                            name={key}
                            placeholder={key}
                            defaultValue={ _.get(pageData, key)}
                        />
                    </div>
                )
            )
        ),
        <form key='form' ref={ form => refs.form = form }>
            {
                _.map(
                    pageFields,
                    ({ id: fieldId, type }) => {
                        const Component = getComponentForType(type);
                        return (
                            <div key={fieldId}>
                                <Component
                                    name={fieldId}
                                    placeholder={fieldId}
                                    defaultValue={_.get(pageData, fieldId)}
                                />
                            </div>
                        );
                    }
                )
            }
            <Button
                onClick={ e => (
                    onSubmit({
                        pageData: getDataFromForm(refs.form),
                        metaData: {
                            title: _.get(refs, ['title', 'value']),
                            template: templateName,
                            slug: _.get(refs, ['slug', 'value'])
                        }
                    })
                        .then( e => onSubmitSuccess())
                )}
                raised
                color='primary'
            >
                { templateName ? 'Create Page' : 'Save Page' }
            </Button>
        </form>
    ]);
};

PageFields.PropTypes = {
    pageFields: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            type: PropTypes.oneOf([
                'text'
            ])
        })
    ),
    hasUrl: PropTypes.bool.isRequired,
    pageData: PropTypes.object,
    templateName: PropTypes.string,
    pageId: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onSubmitSuccess: PropTypes.func.isRequired
}

export default PageFields;
