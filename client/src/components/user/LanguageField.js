import React from 'react'
import InputField from '../translation/TranslateField'
import {Field} from 'redux-form'

const LanguageField = ({ fields, meta: { touched, error, submitFailed }}) => {
    return (
        <ul>
            <li>
            <button className='add-language-btn' type="button" onClick={() => fields.push({})}><i class="material-icons">add</i></button>
            {(touched || submitFailed) && error && <span>{error}</span>}
            </li>
                {fields.map((member, index) => (
                    <li key={index}>
                        <button
                        type="button"
                        title="Remove Language"
                        onClick={() => fields.remove(index)}
                        />
                        <h4>Member #{index + 1}</h4>
                        <Field
                        name={`${member}.firstName`}
                        type="text"
                        component={InputField}
                        label="First Name"
                        />
                        <Field
                        name={`${member}.lastName`}
                        type="text"
                        component={InputField}
                        label="Last Name"
                        />
                    </li>
                ))}
        </ul>
    )
    
}
export default LanguageField 