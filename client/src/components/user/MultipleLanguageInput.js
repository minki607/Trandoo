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

const MultipleLanguageInput = ({input, placeholder, meta: {touched, error, submitFailed}}) => {
const classes = useStyles()

    const { onChange } = input;
    return (
      <div>
        <Autocomplete
          multiple
          classes={classes}
          limitTags={2}
          value={input.value || []}
          id="multiple-limit-tags"
          options={languages}
          onChange={(e, newValue) => {
            onChange(newValue);
          }}
          getOptionLabel={option => option.name}
          getOptionSelected={(option, value) => option.name === value.name}
          renderInput={(params) => (
            <TextField 
            {...params}
             variant="outlined" 
             placeholder={placeholder}
             fullWidth/>
          )}
        />
      </div>
    );
  }
  export default MultipleLanguageInput