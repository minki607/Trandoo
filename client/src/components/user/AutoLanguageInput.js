import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Autocomplete } from '@material-ui/lab'
import { makeStyles } from "@material-ui/core/styles"

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
    
    
    const language = [
        {title: "KOREAN" , code:'ko'}, 
        {title: "JAPANESE" , code: 'jp'}, 
        {title: "CHINESE" , code: 'cn'}
    ]

    const getSelectedOption = () => {
        return language.find(o => o.title === input.value);
      };
    const { onChange, ...rest } = input;
    const classes = useStyles()

    
    return (
        <div>
            <Autocomplete
            autoSelect
            classes={classes}   
            value={getSelectedOption()}
            options={language}
            autoHighlight
            getOptionLabel={option => option.title}
            onChange={(event, newValue) => onChange(newValue)}
            getOptionSelected={(option, value) => {
                if (value) {
                    return option.title === value.title || option.title === input.value;
                }
           
              }}
            renderInput={params => (
                <TextField 
                placeholder="Main Language"
                {...params}
                {...rest}
                value={input.value}
                variant="outlined" 
                fullWidth />
            )}
            />
           {(submitFailed) && error && <div className='error user_field_error'>{error}</div>}
        </div>
    )
}
    

export default AutoLanguageInput 