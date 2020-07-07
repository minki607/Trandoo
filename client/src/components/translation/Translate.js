import React, {Fragment, useState   } from "react"
import TranslateForm from "./TranslateForm"
import TranslateReview from "./TranslateReview"
import {reduxForm} from 'redux-form'
import { withRouter } from 'react-router-dom'; 
import '../../css/form.css'
import { useBeforeunload } from 'react-beforeunload';
import confirmDialog from '../confirmDialog'



//shows request form and form review 
const TranslateNew = ({history}) => {
   
    useBeforeunload(event => event.preventDefault());

    const [showReview, setShow] = useState(false)
    const [open, setOpen] = useState(false);

    const renderContent = () => {
        if (showReview){
            return <TranslateReview onCancel={()=> setShow(false)}/>
        }
        return (
        <Fragment>
            <TranslateForm onFormSubmit ={() => setShow(true)}/>
        </Fragment>
        )
    }       


    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    }
    

        return (
            <div>
                <div className='link'>
                    {showReview 
                    ? 
                    <div className='back-icon' onClick={() => setShow(false)}> 
                    <i className="material-icons">arrow_back</i>Back
                    </div>
                     :
                     confirmDialog(handleClickOpen, handleClose, history, open)
                    
                }
                   
                </div>
                {renderContent()}
            </div>
        )
    }


export default withRouter(reduxForm({
    form: 'translateForm'
})(TranslateNew))