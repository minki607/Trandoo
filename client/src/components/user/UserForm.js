import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import UserDetailForm from './UserDetailForm'
import PrefLangForm from './PrefLangForm'
import ReviewPage from './ReviewPage'
import AreaOfInterestForm from './AreaOfInterestForm'
import Stepper from 'react-stepper-horizontal'

class UserForm extends Component {
    state = {
        page: 0,
        steps: [
            {title: 'Name', onClick: ()=> {this.setState({page: 0})}},
            {title: 'Language', onClick: ()=> {this.setState({page: 1})}},
            {title: 'Expertise', onClick: ()=> {this.setState({page: 2})}},
            {title: 'Review', onClick: ()=> {this.setState({page: 3})}}
            ]
    }


    nextPage = () => {
        this.setState({page: this.state.page + 1 })
    }
    previousPage = () => {
        this.setState({page: this.state.page - 1})
    }
    render() {

        const {page, steps} = this.state

        return (
            <div>
                <Stepper steps={ steps } activeStep={ page } 
                defaultColor='white' 
                activeColor='#d5bdbe'
                completeColor='#b2b2b2' 
                circleFontColor='#404040'
                activeTitleColor='#d5bdbe'
                defaultTitleColor='white'
                completeBarColor='#b2b2b2'
                completeTitleColor='#b2b2b2'
                titleFontSize= {13} />
                {page === 0 && <UserDetailForm onSubmit={this.nextPage} />}
                {page === 1 && (<PrefLangForm previousPage={this.previousPage} onSubmit={this.nextPage}/>)}
                {page === 2 && <AreaOfInterestForm previousPage={this.previousPage} onSubmit={this.nextPage}/>}
                {page === 3 && <ReviewPage previousPage={this.previousPage}/>}
            </div> 
        )
    }
}

function validate(values) {
    console.log()
    const errors = {}
    if (!values.displayName) {
        errors.displayName = 'Name is Required'
      }
      if (!values.languages || !values.languages.length) {
        errors.languages = { _error: 'At least one set must be added' }
      }  else {
        const languageArrayErrors = []
        values.languages.forEach((lang, langIndex) => {
          const languageErrors = {}
          if (!lang|| !lang.title) {
            languageErrors.title = 'Please choose a main language'
            languageArrayErrors[langIndex] = languageErrors
          }
          if (!lang || lang.translate === undefined || lang.translate.length === 0) {
            languageErrors.title = 'Please select at least one language'
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
        displayName: state.auth.displayName ? state.auth.displayName : state.auth.name
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




