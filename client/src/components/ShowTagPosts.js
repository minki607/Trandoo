import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchTagPosts} from '../actions'


const ShowTags = ({fetchTagPosts, tag, match}) => {

    useEffect(() => {
        fetchTagPosts(match.params.name)
     }, [])

    return (
        <div className='tag-page'>
            <div className='row'>
                <div className='tag-name-card col s12 l6'>HELLO</div>
                <div className='tag-post col s12 l6'>HI</div>
            </div>
        </div> 
    )
}


function mapStateToProps({ tag }) {
    return { tag }
}

export default connect(mapStateToProps, {fetchTagPosts})(ShowTags)
