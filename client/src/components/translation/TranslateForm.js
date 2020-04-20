    import _ from 'lodash';
    import React from "react";
    import {reduxForm, Field } from "redux-form";
    import TranslateField from "./TranslateField";
    import TranslationOption from "./TranslationOption";
    import TranslationDate from "./TranslationDate";
    import TranslationBody from "./TranslationBody";
    import TranslationTag from "./TranslationTag";
    import {Link} from "react-router-dom";
    import { MenuItem, Radio} from '@material-ui/core';


    const FIELDS = [
        {label: 'Title', name:'title'},
        {label: 'Language', name:'language'},
        {label: 'Complete in', name:'completeIn'},
        {label: 'Body', name:'body'},
        {label: 'Tags', name:'tags'}
    ]

    class TranslateForm extends React.Component {

        renderFields() {
            return ( _.map(FIELDS, ({name, label}) => {
                switch (name) {

                    case 'language':
                        return(
                        <Field key={name} component={TranslationOption} label={label} name={name}>
                            <MenuItem value={'ff0000'}>KOR-ENG</MenuItem>
                            <MenuItem value={'00ff00'}>ENG-KOR</MenuItem>
                        </Field>
                        )

                    case 'completeIn':
                        return <Field key={name} type='radio' component={TranslationDate} label={label} name={name}/>
                    case 'body':
                        return <Field key={name}  component={TranslationBody} type='text' label={label} name={name}/>
                    case 'tags':
                        return <Field key={name} component={TranslationTag} type='text' label={label} name={name}/>
                    default:
                        return <Field key={name}  component={TranslateField} type='text' label={label} name={name}/>
                }

            }))
        }



        render(){
            return (
                <div>
                    <h2>Translation Form</h2>
                    <form onSubmit={this.props.handleSubmit(this.props.onFormSubmit) }>
                        <div className='row'>
                            {this.renderFields()}
                        </div>
                        <button type='submit' className='btn-flat white-text right'>
                            Next
                        </button>

                        <Link to='/surveys' className='btn-flat white-text right'>
                            Cancel

                        </Link>
                    </form>
                </div>

            )
        }
    }

    function validate(values) {
        const errors = {}

        return errors;
    }

    export default reduxForm({
        validate,
        form: 'translateForm',
        destroyOnUnmount: false
    })(TranslateForm)