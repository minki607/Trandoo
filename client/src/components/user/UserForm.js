import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import UserDetailForm from './UserDetailForm'
import PrefLangForm from './PrefLangForm'
import ReviewPage from './ReviewPage'
import AreaOfInterestForm from './AreaOfInterestForm'

class UserForm extends Component {
    state = {page: 0}
    nextPage = () => {
        this.setState({page: this.state.page + 1 })
    }
    previousPage = () => {
        this.setState({page: this.state.page - 1})
    }
    render() {
        const {onSubmit} = this.props
        const {page} = this.state

        return (
            <div>
                {page === 0 && <UserDetailForm onSubmit={this.nextPage} />}
                {page === 1 && (<PrefLangForm previousPage={this.previousPage} onSubmit={this.nextPage}/>)}
                {page === 2 && <AreaOfInterestForm previousPage={this.previousPage} onSubmit={this.nextPage}/>}
                {page === 3 && <ReviewPage previousPage={this.previousPage}/>}
            </div> 
        )
    }
}

function validate(values) {
    const errors = {}
    if (!values.displayName) {
        errors.displayName = 'Name is Required'
      }
      if (!values.languages || !values.languages.length) {
        errors.languages = { _error: 'At least one language must be added' }
      }  else {
        const languageArrayErrors = []
        values.languages.forEach((lang, langIndex) => {
          const languageErrors = {}
          if (!lang|| !lang.title) {
            languageErrors.title = 'Required'
            languageArrayErrors[langIndex] = languageErrors
          }
        })
    
        if (languageArrayErrors.length) {
            errors.languages = languageArrayErrors
          }
        }
    return errors;
}



const mapStateToProps = (state) => ({
    initialValues: {
        displayName: state.auth.name
      }
})

UserForm = reduxForm({
    form: 'userForm',
    validate,
    enableReinitialize: true,
    forceUnregisterOnUnmount: true,
    destroyOnUnmount: false //keep the form values  
})(UserForm)

UserForm = connect(mapStateToProps)(UserForm)

export default UserForm




