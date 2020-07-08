import React, { Component } from 'react'
import '../css/detail.css'
import {connect} from 'react-redux'
import {fetchRequest} from '../actions'
//import SideBar from './SideBar'
import Loading from './LoadingSpinner'
import ReactHtmlParser from 'react-html-parser' // to render html tags 


class ShowRequest extends Component {
    
    componentDidMount() {
    this.props.fetchRequest(this.props.match.params.id)
    }

    render() {
        const { trans } = this.props
        return (
            <div>
     
                <div className='show-request-page'>
                    {trans.loading ? <Loading/> : 
                    <div className='row'>
                            <div class="text-container">
                                <h2>{trans.single.title}</h2>
                                <p style={{maxWidth: '700px', margin: '30px'}}>{ ReactHtmlParser(trans.single.body) }</p>
                            </div>
                    </div> 
                }     
                </div>
            </div>
        )
    }
}
function mapStateToProps({ trans }) {
    return { trans }
}


export default connect(mapStateToProps, {fetchRequest})(ShowRequest)
