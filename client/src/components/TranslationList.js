import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchRequests} from '../actions'
import LoadingSpinner from './LoadingSpinner'
import {Line} from 'rc-progress'
import { usePagination } from "@material-ui/lab/Pagination";
import renderPagination from './Pagination'



const TranslationList = (props) => {
    
    useEffect(() => {
        props.fetchRequests()
    }, [])   

    //calculate remaining day by subtracting requested date and current date 
    const calcDate = (date) => {
        const today = new Date().toISOString();
        const due = new Date(date)
        const now = new Date(today)
        const remaining = Math.ceil((due - now) / (1000*60*60*24))
       
        return remaining
    } 
    //calculate percentage to show approximately how much day is remaining
    const calcPercent = (day) => {
        const MAX_VALUE = 30
        const perc = day/MAX_VALUE * 100

        return perc
    }

    const updateColor = (day) => {
        const remaining = calcDate(day)
        if (remaining === 1) {
            return '#a00006e0'
          } else if ( remaining >=2 && remaining <=3 ) {
            return '#d8676b'
          } else if ( remaining >=4 && remaining <=7) {
            return '#efaaac';
          } else if ( remaining >=8 && remaining <=14) {
            return '#e2e4c4';
          } else if ( remaining >=15 && remaining <=30) {
            return '#6dcf9d8a';
          } 
    }

    const renderRequests = () => {
        return props.trans.data.docs && props.trans.data.docs.map((req) => {
            return (
                <Link key={req._id} to = {`/translate/view/${req._id}`}>  
                    <div className='collection col s12'>  
                            <div className='card-content'>
                                <div><span className='language'>{req.language}</span> <span className='answer'>0 answer</span></div> 
                                <span className='card-title'>{req.title}</span>
                            </div>
                            {req.tags.map(tag => {
                                return (
                                    <div key={tag._id} className='tag-title'>{tag.name}
                                        <span className='tag-desc'>{tag.description}</span>
                                    </div>
                                    
                                )
                            })
                            }
                            <Line percent={calcPercent(calcDate(req.completeIn))} 
                            strokeWidth="1" 
                            strokeColor={ updateColor(req.completeIn) }/>
                    </div>
                </Link>
            )
        })
    }

        
   const { items } = usePagination({
        count: props.trans.data.totalPages,
        onChange: (event,page) => handleChange(page)
      }) 

   const handleChange = (page) => {
        props.fetchRequests(page)
      };


        return (
            <div className='list-render'>
                {props.trans.loading ? <LoadingSpinner/> : 
                <div className='row'>
                <div className='col l11 s11'>
                  {renderRequests()}
                  </div>
                <div className='col l1 s1'>
                  {renderPagination(items)}
                  </div>
                 
                   
                </div>
            }
            </div>
        )
    }
    

function mapStateToProps({ trans }) {
    return { trans }
}

export default connect(mapStateToProps, {fetchRequests})(TranslationList)
