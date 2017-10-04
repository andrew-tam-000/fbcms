import _ from 'lodash';
import TextField from 'material-ui/TextField';

export function getComponentForType(type) {
    return type == 'text' ? (
        TextField
    ) : (
        'div'
    );
};

export function getDataFromForm(form) {
    return _.reduce(
        _.filter(
            _.get(form, 'elements'),
            formEl => formEl.name
        ),
        (agg, formEl) => _.set(agg, formEl.name, formEl.value),
        {}
    );
}

export function getCurrentTime() {
    return new Date().toISOString();
}
