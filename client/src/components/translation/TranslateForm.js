    import _ from 'lodash';
    import React from "react";
    import {reduxForm, Field } from "redux-form";
    import TranslateField from "./TranslateField";
    import TranslationOption from "./TranslationOption";
    import TranslationDate from "./TranslationDate";
    import TranslationBody from "./TranslationBody";
    import TranslationTag from "./TranslationTag";
    import {Link} from "react-router-dom";
    import { MenuItem} from '@material-ui/core';
    
    const FIELDS = [
        {label: 'Title', name:'title', error:'Provide a Title'},
        {label: 'Language', name:'language', error:'Select a Language'},
        {label: 'Complete in', name:'completeIn', error:'Select a Date'},
        {label: 'Body', name:'body', error: 'Provide a Body'},
        {label: 'Categories', name:'tags'}
    ]

    class TranslateForm extends React.Component {

        renderFields() {
            return ( 
                _.map(FIELDS, ({name, label}) => {
                switch (name) {
                    case 'language':
                        return(
                        <Field key={name} component={TranslationOption} label={label} name={name}>
                            <MenuItem value={'KOR-ENG'}>KOR-ENG</MenuItem>
                            <MenuItem value={'ENG-KOR'}>ENG-KOR</MenuItem>
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
                <div className='request-form'>
                    <div className='section-description'>
                        <h2 className='trans-form-title'>Request Translation</h2>
                        <p className='sub-title'>Post a translation request and we'll find someone who can get the job done on time</p>
                    </div>
                    <form onSubmit={this.props.handleSubmit(this.props.onFormSubmit) }>
                        <div className='row fields'>
                            {this.renderFields()}
                        </div>
                        <button type='submit' className='btn-flat white-text right'>
                            Next
                        </button>
                        <Link to='/translate' className='btn-flat white-text right'>
                            Cancel
                        </Link>
                    </form>
                </div>

            )
        }
    }

    function validate(values) {
        const errors = {}
        _.each(FIELDS, ({name, error}) => {
            if(!values[name]) {
                errors[name] = error
            }
        })
        return errors;
    }

    export default reduxForm({
        validate,
        form: 'translateForm',
        destroyOnUnmount: false //keep the form values  
    })(TranslateForm)