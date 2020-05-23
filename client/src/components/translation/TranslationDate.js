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
                <input {...input} type={type} checked={due === calcDue(1)} id="option-one" name="selector" value= {calcDue(1)} onClick={onDateChange}/><label  className='option_label'  htmlFor="option-one">1d</label>
                <input {...input} type={type} checked={due === calcDue(3)} id="option-two" name="selector" value= {calcDue(3)} onClick={onDateChange}/><label className='option_label' htmlFor="option-two">3d</label>
                <input {...input} type={type} checked={due === calcDue(7)}id="option-three" name="selector" value={calcDue(7)} onClick={onDateChange}/><label className='option_label'  htmlFor="option-three">7d</label>
                <input {...input} type={type} checked={due === calcDue(14)} id="option-four" name="selector" value={calcDue(14)} onClick={onDateChange}/><label className='option_label'  htmlFor="option-four">14d</label>
                <input {...input} type={type} checked={due === calcDue(30)} id="option-five" name="selector" value={calcDue(30)} onClick={onDateChange}/><label className='option_label'  htmlFor="option-five">30d+</label>
            </div>
        )
        }

    return (
        <div className='col s6'>
            <label>{label}</label>
            <br/>
                 {renderField()}
    
                 <br/>
            {due ? <span className='completion_date'> {due.toString()}</span> : null}
            {touched && error ? (<div className='error'> {touched && error}</div>): <div className='no_error'> </div>}


        </div>
    )
}