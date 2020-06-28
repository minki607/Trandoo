import React, {Fragment, useEffect} from 'react'
import { Field, reduxForm } from 'redux-form'
import {withRouter} from 'react-router-dom' // get access to history object's properties 
import {connect} from 'react-redux'
import * as actions from '../actions'
import LoadingSpinner from './LoadingSpinner'



let TagForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, postTag, fetchTags, tag, history} = props

  useEffect(() => {
    fetchTags()
 }, [])
 
  const submit = (values) => {
      postTag(values, history)
  }

  const renderList = () => {
      return tag.data.map((req,i) => {
        return (
                <div key={i} className='collection col s12'>  
                        <div className='card-content'>
                            <div><span className='language'>{req.name}</span></div>
                            <span className='card-title'>{req.description}</span>
                        </div>
                </div>
        )
    })

  
  }

  return (
    <Fragment>
      <h2 style={{textAlign: 'center'}}>Add New Tag</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label>Tag name</label>
          <div>
            <Field name="name" component="input" type="text" placeholder="Tag Name"/>
          </div>
        </div>
        <div>
          <label>Description</label>
          <div>
    
            <Field name="description" component="input" type="text" placeholder="Description"/>
          </div>
        </div>
      <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>

      <div className='container list-render'>
                {tag.loading ? <LoadingSpinner/> : 
                <div className='row'>
                    {renderList()}
                </div>}
       </div>
    </Fragment>
  )
}

function mapStateToProps({tag}) {
  return {tag}
}

TagForm = reduxForm({
  form: 'tagForm'  // a unique identifier for this form
})(TagForm)

TagForm = connect(mapStateToProps, actions)(withRouter(TagForm))

export default TagForm







