import React from "react";
import TranslateForm from "./TranslateForm";
import TranslateReview from "./TranslateReview";
import '../../css/form.css'

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

export default TranslateNew