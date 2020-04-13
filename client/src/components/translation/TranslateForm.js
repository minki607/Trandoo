    import _ from 'lodash';
    import React from "react";
    import {reduxForm, Field } from "redux-form";
    import SurveyField from "./TranslateField";
    import {Link} from "react-router-dom";


    const FIELDS = [
        {label: 'Survey title', name:'title'},
        {label: 'Subject', name:'subject'},
        {label: 'Email', name:'email'},
        {label: 'Recipient', name:'recipient'}
    ]

    class TranslateForm extends React.Component {

        renderFields() {
            return ( _.map(FIELDS, ({name, label}) => {
                return <Field key={name} component={SurveyField} type='text' label={label} name={name}/>
            }))
        }

        handleChange = (event) =>{
            console.log(event)
        }

        render(){
            return (
                <div>
                    <h2>Translation Form</h2>
                    <input type='text' name='title' value='MR' onChange={this.handleChange}/>
                    <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                        {this.renderFields()}
                        <button type='submit' className='teal btn-flat white-text right'>
                            Next
                        <i className='material-icons right'>navigate_next</i>
                        </button>

                        <Link to='/surveys' className='red btn-flat white-text left'>
                            Cancel
                        <i className='material-icons right'>cancel</i>
                        </Link>
                    </form>
                </div>

            )
        }
    }

    function validate(values) {
        const errors = {}

        if (!values.title) {
            errors.title = 'You must provide a title';
        }

        return errors;
    }

    export default reduxForm({
        validate,
        form: 'surveyForm'
    })(TranslateForm)