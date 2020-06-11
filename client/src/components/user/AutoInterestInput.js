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
          id="multiple-speciality-tags"
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
             placeholder="Expertise" 
             fullWidth/>
             
          )}
        />
        {(touched || submitFailed) && error && <div className='error user_field_error'>{error}</div>}
      </div>
    );
  }
  export default AutoInterestInput