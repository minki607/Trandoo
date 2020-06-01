import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import '../css/preference.scss'
import {connect} from 'react-redux'
import UserForm from './user/UserForm'
import { CSSTransition } from 'react-transition-group';

class Preference extends React.Component{

    state = { showForm: false};
     
    renderForm = () => {
        this.setState({
            showForm: true
        })
    }

    render(){

        return (
            <Fragment>
                <div className='pref_page'>
                    <div className="page_left">
                        <div className="page_left_content scrollable">
                            <h2 className='pref_title boxHeader_title'  >
                            Hi {this.props.auth ? this.props.auth.name : null },
                            </h2>
                            <p className='pref_description'>Please take a minute to tell us about yourself<br/>
                            so we can optimize the app for you!</p>
                            <div className='pref_button'>   
                                    <button disabled={this.props.auth ? false : true} id="start-btn" className="header-btn" onClick={this.renderForm}>
                                        Start</button>
                                    <Link to='/translate' id="later-btn" className="later-btn header-btn">
                                        Later
                                    </Link>
                            </div>
                                <CSSTransition in={this.state.showForm} 
                                timeout={500} 
                                classNames='form-transition'
                                unmountOnExit
                                >
                                <div className='container'>
                                    <div className='user-form'>
                                        <UserForm/>
                                    </div>
                                    <div className='img-wrap'>
                                        <img src='/images/setPref_character.png' alt='character'/>
                                    </div>
                                </div>
                                </CSSTransition>     
                        </div> 
                    </div>

                    
                
                    <div className="page_right">
                        <img className='page_right_img' src='images/setPref.png' alt='preference_image'/>
                    </div>
                </div>      
            </Fragment>
        ) 
    }

}
function mapStateToProps(state) {
    return { auth: state.auth };
}
export default connect(mapStateToProps)(Preference)