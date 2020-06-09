import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Autocomplete } from '@material-ui/lab'

const MultipleLanguageInput = ({input, meta: {touched, error, submitFailed}}) => {
  
    const language = [
        {title: "KOREAN" , code:'ko'}, 
        {title: "JAPANESE" , code: 'jp'}, 
        {title: "CHINESE" , code: 'cn'}
    ]

    return (
      <div>
        <Autocomplete
          multiple
          limitTags={2}
          id="multiple-limit-tags"
          options={language}
          getOptionLabel={(option) => option.title}
          getOptionSelected={(option, value) => option.title === value.title}
          renderInput={(params) => (
            <TextField 
            {...params}
            {...input}
             variant="outlined" placeholder="Translatable Language(s)" fullWidth/>
          )}
        />
      </div>
    );
  }
  export default MultipleLanguageInput