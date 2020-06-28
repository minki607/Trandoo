import React from 'react'
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

const AutoLanguageInput = ({input, meta: {touched, error, submitFailed}}) => {
    
    const { onChange } = input;
    const classes = useStyles()
    return (
        <div>
            <Autocomplete
            autoSelect
            classes={classes}   
            value={input.value}
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
                placeholder="Main Language"
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