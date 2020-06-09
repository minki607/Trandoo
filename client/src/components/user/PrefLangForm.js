import React from 'react'
import { FieldArray, reduxForm } from 'redux-form';
import LanguageField from './LanguageField'


const PrefLangForm = (props) => {
 
    const { handleSubmit, previousPage} = props;
    return (
      <form onSubmit={handleSubmit}>
            <h4 className='form-info' style={{paddingBottom: '20px'}}>
            Add up to 5 languages</h4>
                <FieldArray name='languages' component={LanguageField}/>
            <div>
                <button type="button" className="previous-btn" onClick={previousPage}>
                    <i className="material-icons">navigate_before</i> Prev
                </button>
                <button className="next-btn" type="submit"> Next
                <i className="material-icons">navigate_next</i>
                </button>
            </div>
       </form>
       )
}
export default reduxForm({
    form: 'userForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
  })(PrefLangForm);