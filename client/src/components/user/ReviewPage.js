import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as actions from '../../actions';

const ReviewPage = ({ previousPage, formValues, submitPref, history }) => {
    return (
        <div> 
            <div className='review-content'>
            <h6 className='review-title'>Display Name</h6>
            <span className='form-values'>{formValues.displayName}</span>

            <h6 className='review-title'>Language</h6>
            {
                //map through language field array
                formValues.languages.map(((lang, i) => {
                    return (
                    <div className='language-content' key={i}>
                        <span className='form-values' key={i}>{lang.title.name}</span>
                            <div style={{marginBottom: '5px'}}>
                                <i className="medium material-icons rotated" style={{color:'#a08e92'}}>compare_arrows</i>
                            </div>
                        {lang.translate.map((trans, idx) => {
                            return ( <span className='form-values-trans' key={idx}>{trans.name} </span>)
                        })}
                    </div>
                )
                })
            )}
            <h6 className='review-title'>Expertise</h6>
            {
                formValues.specialities? (
                    formValues.specialities.map((spec, i)=> {
                        return (
                            <div style={{display: 'inline-block', marginBottom:'30px'}} key={i} >
                                <span className='form-values-spec'>{spec.title}</span>
                            </div>
                        )
                    })
                ) : null
      
            }
            </div>
            <div>
                <button type="button" className="previous-btn" onClick={previousPage}>
                <i className="material-icons">navigate_before</i> Prev
                </button>
                <button onClick={()=> submitPref(formValues, history)} className="next-btn" type="submit"> Submit 
                <i style= {{color:'#aebea7'}} className="material-icons">check</i>
                </button>
            </div>
        </div>
    )
    
}

function mapStateToProps(state) {
    return {
        formValues : state.form.userForm.values
    }
}

export default connect(mapStateToProps, actions)(withRouter(ReviewPage))