import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom' // get access to history object's properties 
import * as actions from '../../actions';

const ReviewPage = ({handleSubmit, previousPage, formValues }) => {
    return (
        <div> 
            {console.log(formValues)}
            <button type="button" className="previous-btn" onClick={previousPage}>
            <i className="material-icons">navigate_before</i> Prev
            </button>
        </div>
    )
    
}

function mapStateToProps(state) {
    return {
        formValues : state.form.userForm.values
    }
}

export default connect(mapStateToProps, actions)(withRouter(ReviewPage))