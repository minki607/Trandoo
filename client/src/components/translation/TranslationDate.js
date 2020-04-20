import React, {useState} from 'react'


export default ({input, label, type, meta: {error, touched}}) => {

    const [due, setDue] = useState(null)

    const onDateChange = (e) => {
       setDue(e.target.value)
    }

    //calculate the preferred due data based on option selected
    const calcDue = (due) => {
        const date = new Date();
        date.setDate(date.getDate()+ parseInt(due))
        return date.toDateString()
    }

    const renderField = () =>{
        return (
            <div className="radio-group">
                <input {...input} type={type} checked={due =='1'} id="option-one" name="selector" value='1' onClick={onDateChange}/><label  className='option_label'  htmlFor="option-one">1d</label>
                <input {...input} type={type} checked={due =='3'} id="option-two" name="selector" value='3' onClick={onDateChange}/><label className='option_label' htmlFor="option-two">3d</label>
                <input {...input} type={type} checked={due =='7'}id="option-three" name="selector" value='7' onClick={onDateChange}/><label className='option_label'  htmlFor="option-three">7d</label>
                <input {...input} type={type} checked={due == '14'} id="option-four" name="selector" value='14' onClick={onDateChange}/><label className='option_label'  htmlFor="option-four">14d</label>
                <input {...input} type={type} checked={due == '30'} id="option-five" name="selector" value='30' onClick={onDateChange}/><label className='option_label'  htmlFor="option-five">30d+</label>
            </div>
        )

        }

    return (
        <div className='col s6'>
            <label>{label}</label>
            <br/>
                 {renderField()}
                 <br/>
                {due ? (calcDue(due)).toString() : null}
            <div className='red-text' style={{marginBottom: '20px'}}>
                {touched && error}
            </div>


        </div>
    )
}