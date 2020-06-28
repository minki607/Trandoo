import React from 'react'
import {Link} from 'react-router-dom'

const EmptyList = ({message, btnTitle,link}) => {

    return (
        <div className='setPref-container'>
            <div className='error-txt'>
                <h2 className='message'>{message}</h2>
                <Link to={link}>
                    <button className='header-btn setup-btn'>{btnTitle}</button>
                </Link>
            </div>
        <img className='error-img' src={`../images/confused${Math.floor(Math.random() * 2)}.png`} alt='empty'/> 
      </div>
    )
}
export default EmptyList