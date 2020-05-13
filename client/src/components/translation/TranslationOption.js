import React from 'react'
import { Select } from '@material-ui/core';


export default ({ input, label, children, meta: {error, touched}}) => {
    return (
        <div className='col s6'>
            <label>{label}</label>
            <br/>
            <Select
                disableUnderline
                {...input}
                children={children}/>        
            {touched && error ? (<div className='error'> {touched && error}</div>): <div className='no_error'> </div>}  
            <br/>
        </div>
    )
}