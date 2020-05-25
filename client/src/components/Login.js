import React, {Fragment} from 'react'
import '../css/login.scss'


class Login extends React.Component{
    render() {
        return (
            <Fragment>
                <div className="login-page">
                <div className="login-box">
                    

                    <div className='content'>
                        <p className="login-title">Login | Sign Up</p>
                        <div className="social-media">
                            <a href='auth/google'>
                                <button  className='header-btn login-btn'> 
                                    <span className="img-icon"><img src='images/google_icon.png' alt='google_icon'/></span> 
                                    <span className="button-text">Google</span>
                                </button>
                            </a>
                            <a href='auth/facebook'>
                                <button className="header-btn login-btn">
                                    <span className="img-icon"><img src='images/facebook_icon.png' alt='facebook_icon'/></span>
                                    <span className="button-text">Facebook</span>
                                </button>
                            </a>
                            <a href='auth/github'>
                                <button type="button" className="header-btn login-btn">
                                    <span className="img-icon"><img src='images/github_icon.png' alt='facebook_icon'/></span>
                                    <span className="button-text">github</span>
                                </button>
                            </a>
                        </div>
                    </div>

                    <div className="img-wrapper">
                    <img src="/images/loginimg3.png" alt="Login"/>
                    </div>
                </div>
                </div>
            </Fragment>    
        )
    }
}

export default Login