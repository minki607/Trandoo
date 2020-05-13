import React, {useState} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {Line} from 'rc-progress'





export default ({input, label, meta: {error, touched}}) => {

    const [wordCount, setCount] = useState(0) 

    const calcPercent = (word) => {
        const MAX = 200
        var percentage = word/MAX * 100
        
        return percentage
    }

    return (
        <div className='col s12'>
            <label>{label}</label>
            <br/>
            <CKEditor editor={ClassicEditor}
                       data={input.value}
                       config={{
                           wordCount: {
                               onUpdate: stats => {
                                   // update word count 
                                  setCount(stats.words)
                               }
                           },
                          toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'highlight', '|', 'alignment', 'numberedList', 'bulletedList', 'insertTable',
                               'mediaEmbed', '|', 'undo', 'redo' ]
                      }}
                       style={{marginTop: '5px', marginBottom: '5px'}}

                       onChange={(event, editor) => {
                           return input.onChange(editor.getData())
                       }}
                        />
            <Line percent={calcPercent(wordCount)} strokeWidth="1" strokeColor="#cdc2c7" />  

            {touched && error ? (<div className='error'> {touched && error}</div>): <div className='no_error'> </div>}

            <div>

            </div>


        </div>
    )
}