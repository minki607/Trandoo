    import _ from 'lodash';
    import React from "react";
    import {reduxForm, Field } from "redux-form";
    import TranslateField from "./TranslateField";
    import TranslationDate from "./TranslationDate";
    import TranslationBody from "./TranslationBody";
    import TranslationTag from "./TranslationTag";
    import AutoLanguageInput from "../user/AutoLanguageInput"
    

    const FIELDS = [
        {label: 'Title', name:'title', error:'Provide a Title'},
        {label: 'Original Language', name:'originalLanguage', placeholder:'Original', error:'Select current language'},
        {label: 'Target Language', name:'targetLanguage', placeholder:'Target', error:'Select the target Language'},
        {label: 'Complete in', name:'completeIn', error:'Select a Date'},
        {label: 'Body', name:'body', error: 'Provide a Body'},
        {label: 'Categories (Optional)', name:'tags'}
    ]

    class TranslateForm extends React.Component {
        
      
        renderFields() {
            return ( 
                _.map(FIELDS, ({name, label, placeholder}) => {
                switch (name) {
                    case 'originalLanguage':
                        return(
                        <Field key={name} component={AutoLanguageInput} placeholder={placeholder} label={label} name={name} forReq={true}/>
                        )
                    case 'targetLanguage':
                        return(
                        <Field key={name} component={AutoLanguageInput} placeholder={placeholder} label={label} name={name} forReq={true}/>
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

       if (values['originalLanguage'] === values['targetLanguage']) {
           errors['originalLanguage'] = 'Change one of the following'
           errors['targetLanguage'] = 'Change one of the following'
       }
        return errors;
    }

    export default reduxForm({
        validate,
        form: 'translateForm',
        destroyOnUnmount: false //keep the form values  
    })(TranslateForm)