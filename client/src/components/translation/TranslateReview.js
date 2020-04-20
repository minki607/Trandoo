import React from 'react'
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser' /* to render html tags */

const TranslateReview = ({onCancel, formValues}) => {
    return (
        <div>
            <h4>Confirm Entries</h4>

            <div>
                <label>Title</label>
                <p>{formValues.title}</p>
            </div>

            <div>
                <label>Title</label>
                <p>{formValues.language}</p>
            </div>

            <div>
                <label>Body</label>
                <p>{ReactHtmlParser(formValues.body)}</p>
            </div>

            <div>
                <label>Tags</label>
                <p>{formValues.tags}</p>
            </div>

            <button className='yellow darken-3 btn-flat' onClick={onCancel}>
                Back
            </button>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        formValues : state.form.translateForm.values
    }
}

export default connect(mapStateToProps)(TranslateReview)