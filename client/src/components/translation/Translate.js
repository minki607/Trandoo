import React from "react"
import TranslateForm from "./TranslateForm"
import TranslateReview from "./TranslateReview"
import {reduxForm} from 'redux-form'
import '../../css/form.css'

//shows request form and form review 
class TranslateNew extends React.Component {

    state = {showReview: false}

    renderContent() {
        if (this.state.showReview === true){
            return <TranslateReview onCancel={()=> this.setState({showReview:false})}/>
        }
        return <TranslateForm onFormSubmit ={() => this.setState({showReview : true}) }/>

    }

    render(){

        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({
    form: 'translateForm'
})(TranslateNew)