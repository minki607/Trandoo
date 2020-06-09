import React from 'react';

//The following field component is use in request form and userform
//renders different style based on styleFor props 
export default ({input, label, styleFor, meta: {error, touched}}) => {
    
    const InputStyle = {
        marginBottom: '5px',
        backgroundColor: '#ffffffc7',
        textAlign: 'center'
      };
    
    return (
        <div className='col s12'>
            <label>{label}</label>
            <input {...input} 
            style = {(styleFor === 'user') ? InputStyle : null }/>
            {touched && error ?  //if there is error, render that error with different styling based on its usage
                (<div className={`error ${ styleFor === 'user' ? 'user_field_error' : ''}`}> 
                {touched && error}</div>): 
                <div className='no_error'> </div>}
        </div>
    )
}