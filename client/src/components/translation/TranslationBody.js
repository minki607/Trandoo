import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'


export default ({input, label, meta: {error, touched}}) => {

    return (
        <div className='col s12'>
            <label>{label}</label>
            <br/>
            <CKEditor  editor={ClassicEditor}
                       data={input.value}
                       config={{

                          toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'highlight', '|', 'alignment', 'numberedList', 'bulletedList', 'insertTable',
                               'mediaEmbed', '|', 'undo', 'redo' ]
                      }}
                       style={{marginTop: '5px', marginBottom: '5px'}}

                       onChange={(event, editor) => {
                           return input.onChange(editor.getData())
                       }}
                        />
            <div className='red-text' style={{marginBottom: '20px'}}>
                {touched && error}
            </div>

            <div>

            </div>


        </div>
    )
}