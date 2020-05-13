import React, {useState} from 'react';
import '../../css/tags.scss'
export default ({input  , label, meta: {error, touched}}) => {
    const [tags, setTags] = useState([])

    const addTags = event => {
        const {value} = event.target //destructuring
        if (event.key === ' '
            && value.replace(/\s/g, '').length // disallow user to type in tags consisting of spaces only
            && !(tags.includes(value)) //tag is already added
        ) {
            setTags([...tags, value])
            event.target.value = ''

        } else if (tags.includes(value)) //if tag already exist clear value
            event.target.value = ''

    }

    const removeTag = indexRemove => {
        setTags(tags.filter((_,index) => index !== indexRemove ))
    }

    return (
        <div className='col s12'>
            <label>{label}</label>
            <br/>
            <div className='tagHere'>
                <input {...input} placeholder='Separate tags by space (Max 3)'
                       style={{marginBottom: '5px'}}
                       onKeyUp={addTags}
                       disabled={tags.length >= 3 ? true : false }
                />

                {
                    tags.map((tag, index) => {
                        return (
                            <div key={index} className='tag'>
                                <span>{tag}</span>
                                <i onClick={() => removeTag(index)} className='material-icons tag-icon'>close</i>
                            </div>
                        )
                    })
                }

            </div>
            <div className='red-text' style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
        </div>
    )
}