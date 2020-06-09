import React from 'react'
import { Field, reduxForm } from 'redux-form';
import AutoInterestInput from './AutoInterestInput'


const AreaOfInterestForm = (props) => {
 
    const { handleSubmit, previousPage} = props;
    return (
      <form onSubmit={handleSubmit}>
            <h4 className='form-info' style={{paddingBottom: '20px'}}>
            Add in  areas of <span className='emphasize'>experties</span></h4>
                <Field name='specialities' component={AutoInterestInput}/>
            <div>
                <button type="button" className="previous-btn" onClick={previousPage}>
                    <i className="material-icons">navigate_before</i> Prev
                </button>
                <button className="next-btn" type="submit"> Review
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
  })(AreaOfInterestForm);