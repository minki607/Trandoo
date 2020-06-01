import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form';
import InputField from '../translation/TranslateField'
import LanguageField from './LanguageField'


const PrefLangForm = (props) => {
 
    const { handleSubmit, pristine, previousPage, submitting } = props;
    return (
      <form onSubmit={handleSubmit}>
            <h4 className='form-info' style={{paddingBottom: '20px'}}>
            Add up to 3 languages</h4>
                <FieldArray name='languages' component={LanguageField}/>
            <div>
                <button className="previous-btn" onClick={previousPage}>
                    <i class="material-icons">navigate_before</i> Prev
                </button>
                <button className="next-btn" type="submit"> Next
                    <i class="material-icons">navigate_next</i>
                </button>
            </div>
       </form>
       )
}
export default reduxForm({
    form: 'wizardForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
  })(PrefLangForm);