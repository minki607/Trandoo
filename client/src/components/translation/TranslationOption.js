import React from 'react'
import { Select } from '@material-ui/core';


export default ({ input, label, children, meta: {error, touched}}) => {
    return (
        <div className='col s6'>
            <label>{label}</label>
            <br/>
            <Select
                disableUnderline
                errorText={touched && error}
                {...input}
                children={children}/>
            <br/>
        </div>
    )
}