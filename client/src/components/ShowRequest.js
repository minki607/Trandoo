import React, { Component } from 'react'
import '../css/detail.css'
import {connect} from 'react-redux'
import {fetchRequest} from '../actions'
//import SideBar from './SideBar'
import Loading from './LoadingSpinner'
import ReactHtmlParser from 'react-html-parser' // to render html tags 
import Velocity from 'velocity-animate';


class ShowRequest extends Component {
    
    constructor(props) {
        super(props);
        this.block = React.createRef();
      }
    
     handleClick = () => {
        Velocity(this.block.current,{ translateX:['50%'] },900)
    }
    
    close = () => {
      Velocity(this.block.current,{ translateX:0 },900)
    }

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
                        
                        <div class="split-screen-container">
                        <textarea style={{width:'50%', position:'absolute', left:'0'}} rows="4" cols="50">
                        At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
                        </textarea>
                            <span style={{color: 'white' , float: 'left'}}>hi</span>
                            <div ref={this.block} class="split-screen-left">
                            <div class="inner-split-left" id="profile-1-text">
                                <p onClick = {this.close} class="close close-left">X</p>
                            <div class="text-container">
                                <h2>{trans.single.title}</h2>
                                <p style={{maxWidth: '700px', margin: '30px'}}>{ ReactHtmlParser(trans.single.body) }</p>
                                <button onClick={this.handleClick} class="see-more" id="open-left">See More</button>
                                </div>
                            </div>
                            <div class="inner-split-right" style={{marginTop: '100px'}} id="profile-1">
                            Further details 
                            <br/>
                            Song Detail: blahblah
                            <br/>
                            Song Writer: blahblah
                                   
                                </div>   
                            </div>
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
