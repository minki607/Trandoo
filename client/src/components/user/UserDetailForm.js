import React from 'react'
import { Field, reduxForm } from 'redux-form';
import '../../css/form.css'
import InputField from '../translation/TranslateField'
import {connect} from 'react-redux'

let UserDetailForm = (props) =>  {
        const {handleSubmit} = props
    
        return (
            <form onSubmit={handleSubmit}>
                <h4 className='form-info'>What Should We Call You?</h4>
                <Field name='displayName' type='text' 
                component={InputField} styleFor='user'/>

            <div>
                <button className="next-btn" type="submit"> Next
                <i className="material-icons">navigate_next</i>
                </button>
            </div>
            </form>
        )
}

const mapStateToProps = (state) => ({

})

 UserDetailForm = reduxForm({
    form: 'userForm',
    enableReinitialize: true,
    forceUnregisterOnUnmount: true,
    destroyOnUnmount: false //keep the form values  
})(UserDetailForm)

UserDetailForm = connect(mapStateToProps)(UserDetailForm)

export default UserDetailForm