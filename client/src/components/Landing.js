import React, {Fragment} from 'react'
import { Link } from 'react-router-dom';
import '../css/landing.css';
import '../css/header.scss';    
import * as actions from '../actions/types';
import {connect} from 'react-redux';

class Landing extends React.Component  {

    render(){
        return (
            <Fragment>
                <header className='boxHeader'>
                    <div className='boxHeader_content'>
                        <article className='boxHeader_text'>
                            <p className='boxHeader_subTitle'>Transdoo</p>
                            <h2 className='boxHeader_title'>Translation platform </h2>
                            <p className='boxHeader_description'>
                            <span className='title_description'>TRANSDOO</span> is designed for anyone 
                            who requires <span className='emphasize'>human translation</span>. <br/>
                            We help you get the translated version of your request from people who 
                            understand the language inside out.
                            </p>
                            <Link to='/translate'><button className='cta'>Translate</button></Link>
                        </article>
                        <img className='header-image' src='../images/landing_header.png' alt='header'/>   
                    </div>
                    
                    </header>
              
            </Fragment>

        );

    }

}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(Landing)
