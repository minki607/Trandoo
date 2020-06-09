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

const AutoInterestInput = ({input, meta: {touched, error, submitFailed}}) => {
  
    const specialities = [
        {title: "BUSINESS" }, 
        {title: "IT"}, 
        {title: "SLANG"}
    ]


const classes = useStyles()

    const { onChange } = input;
    return (
      <div>
        <Autocomplete
        
          multiple
          classes={classes}
          limitTags={4}
          value={input.value || []}
          id="multiple-limit-tags"
          options={specialities}
          onChange={(e, newValue) => {
            onChange(newValue);
          }}
          getOptionLabel={option => option.title}
          getOptionSelected={(option, value) => option.title === value.title}
          renderInput={(params) => (
            <TextField 
            {...params}
             variant="outlined" 
             placeholder="Specialities" 
             fullWidth/>
          )}
        />
      </div>
    );
  }
  export default AutoInterestInput