import React from 'react';

export default ({input, label, meta: {error, touched}}) => {
    return (
        <div className='col s12'>
            <label>{label}</label>
            <input {...input} style={{marginBottom: '5px'}} />

            {touched && error ? (<div className='error'> {touched && error}</div>): <div className='no_error'> </div>}
            


        </div>
    )
}