import React from 'react'
import { Field, reduxForm } from 'redux-form';
import InputField from '../translation/TranslateField'
import {connect} from 'react-redux'

let UserDetailForm = (props) =>  {
        const {handleSubmit} = props
        const InputStyle = {
            marginBottom: '5px',
            backgroundColor: '#ffffffc7',
            textAlign: 'center'
          };


        return (
            <form onSubmit={handleSubmit}>
                <h4 className='form-info'>What Should We Call You?</h4>
                <Field initialValues={{displayName: 'hi'}}  name='displayName' type='text' 
                component={InputField} style={InputStyle}/>

            <div>
                <button className="next-btn" type="submit"> Next
                <i class="material-icons">navigate_next</i>
                </button>
            </div>

            </form>
        )
}

const mapStateToProps = (state) => ({
    initialValues: {
        displayName: state.auth.name
      }
})

 UserDetailForm = reduxForm({
    form: 'userForm',
    enableReinitialize: true,
    destroyOnUnmount: false //keep the form values  

    
})(UserDetailForm)

UserDetailForm = connect(mapStateToProps)(UserDetailForm)

export default UserDetailForm