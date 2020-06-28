import React from "react"
import TranslateForm from "./TranslateForm"
import TranslateReview from "./TranslateReview"
import {reduxForm} from 'redux-form'
import {Link} from 'react-router-dom'
import '../../css/form.css'

//shows request form and form review 
class TranslateNew extends React.Component {

    state = {showReview: false}

    renderContent() {
        if (this.state.showReview === true){
            return <TranslateReview onCancel={()=> this.setState({showReview : false})}/>
        }
        return (
        <React.Fragment>
            <TranslateForm onFormSubmit ={() => this.setState({showReview : true})}/>
        </React.Fragment>
        )
    }

    render(){
        return (
            <div>
                <div className='link'>
                    <Link to='/translate'>
                    <div className='back-icon'> 
                    <i className="material-icons">arrow_back</i>Back to Dashboard
                    </div>
                </Link>
                </div>
                {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({
    form: 'translateForm'
})(TranslateNew)