import React from 'react'
import {Link} from 'react-router-dom'
import {Line} from 'rc-progress'
import Tooltip from '@material-ui/core/Tooltip';


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
      } else {
          return '#d9d9d9'
      }
}

const calcPosted = (postedDate) => {
    var postDate = new Date(postedDate) // covert from ISO date format to date format
    var nowDate = new Date() //current date
    var postDateSecond = postDate.getTime() / 1000
    var nowDateSecond = nowDate.getTime() / 1000
    var postedAgo = nowDateSecond -postDateSecond 

    var sec = Math.floor(postedAgo)
    var min = Math.floor(postedAgo / 60)
    var hour = Math.floor(postedAgo / 3600)
    var day = Math.floor(postedAgo / 86400) 
    
    if (postedAgo < 60) {
        return (sec + ` sec${postedAgo === 1 ? ' ago' : 's ago' }`) //dealing with plural cases
    } else if (postedAgo < 3600) { //3600 = 60 min
        return(min + ` min${min === 1 ? ' ago' : 's ago'}`);
    } else if (postedAgo < 86400) { //86400 =24 hours
        return (hour + ` hour${hour === 1 ? '   ago' : 's ago'}`);
    } else if (postedAgo < 2.592e+6) { //2.592e+6 = 30days
        return(day + ` day${day === 1 ? ' ago' : 's ago'}`);
    } else if (postedAgo >= 2.592e+6){ //if more than 30 days display the date itself + 
        return(postedDate.split("T")[0])
    }
}

const renderPosts = (req) => {
    return (
        <div key={req._id} className='collection col s12'>  
            <Link className='overlay' to = {`/translate/view/${req._id}`}></Link>  
                    <div className='inner'>  
                        <div className='card-content'>
                            <span className='language'> 
                                <span className='original'>{req.originalLanguage.code}</span> 
                                <img style= {{width:'10px'}} src='/images/language_change.png' alt='change_icon'/> 
                                <span className='target'>{req.targetLanguage.code}</span> 
                            </span>   
                            <div className='card-title'>{req.title}
                             <div className='posted-date'>{calcPosted(req.dateSent)}</div>
                            </div>
                            

                           <span className='answer'><span className='answer-count'>0</span> <span className='answer-txt'>answer</span></span>
                        </div>
                        {req.tags.map((tag,i) => {
                            return (
                                <Link key={i} to={`translate/tag/${tag.name}`}>
                                    <div className='tag-title'>{tag.name}
                                        {tag.description ?  <span className='tag-desc'>{tag.description}</span> : null}
                                    </div>
                                </Link>
                            ) 
                        })
                        }
                        <Tooltip title={`${calcDate(req.completeIn)} days remaing`} className='percentage'>
                            <Line percent={calcPercent(calcDate(req.completeIn))} 
                            strokeWidth="1" 
                            strokeColor={ updateColor(req.completeIn) }/>
                        </Tooltip>
                    </div>
        </div>
    )
}
export default renderPosts