import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import { Autocomplete } from '@material-ui/lab'
import { makeStyles } from "@material-ui/core/styles"
import {languages} from '../const/LanguageArray'


const useStyles = makeStyles(theme => ({

inputRoot: {
    backgroundColor: "#f2f2f2",
    marginBottom: '20px',
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none"
    }
  }
}));

const AutoLanguageInput = ({forReq = false, placeholder, input, label, meta: { error, submitFailed}}) => {
    
    const [state] = useState({name: ''}) 
    const { value, onChange } = input;
    const classes = useStyles()
    return (
        <div className={`${ forReq ? 'col l6 m6 s12' : ''}`}>
            {forReq ? <label>{label}</label> :null}
            <Autocomplete
            autoSelect
            classes={classes}   
            value={value ? value : state }
            options={languages}
            autoHighlight
            getOptionLabel={option => option.name}
            onChange={(e, newValue) => {
                onChange(newValue);
              }}
            getOptionSelected={(option, value) => {
                if (value) {
                    return option.name === value.name || option.name === input.value;
                }
           
              }}
            renderInput={params => (
                <TextField 
                placeholder={placeholder}
                {...params}
                variant="outlined" 
                fullWidth />
            )}
            
            />
           {(submitFailed) && error && <div className='error user_field_error'>{error}</div>}
        </div>
    )
}
    

export default AutoLanguageInput 