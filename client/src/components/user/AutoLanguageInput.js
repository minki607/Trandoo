import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Autocomplete } from '@material-ui/lab'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({

inputRoot: {
    fontFamily: "Raleway",
    backgroundColor: "#f2f2f2",
    marginBottom: '20px',
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none"
    }
  },
  option: {
      textAlign: 'center'
  }
}));

const AutoLanguageInput = ({input, meta: {touched, error, submitFailed}}) => {
    

    const language = [
        {title: "KOREAN" , code:'ko'}, 
        {title: "JAPANESE" , code: 'jp'}, 
        {title: "CHINESE" , code: 'cn'}
    ]

    const classes = useStyles()

    
    return (
        <div>
            <Autocomplete
            autoSelect
            classes={classes}
        
            options={language}
            autoHighlight
            getOptionLabel={option => option.title}
            onChange={(event, newValue) => console.log(newValue)}
            getOptionSelected={(option, value) => option.title === value.title}
            renderInput={params => (
                <TextField 
                {...params}
                {...input}
                variant="outlined" fullWidth />
            )}
            />
           {(submitFailed) && error && <div className='error user_field_error'>{error}</div>}
        </div>
    )
}
    

export default AutoLanguageInput 