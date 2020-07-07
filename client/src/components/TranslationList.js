import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchRequests} from '../actions'
import LoadingSpinner from './LoadingSpinner'
import { usePagination } from "@material-ui/lab/Pagination";    
import renderPagination from './Pagination'
import renderPosts from './renderPosts'



const TranslationList = ({trans ,fetchRequests}) => {
    
    useEffect(() => {
        fetchRequests()
    }, [])   

    const renderRequests = () => {
        return trans.data.docs && trans.data.docs.map((req) => {
            return (
            renderPosts(req)
            )
        })
    }

        
   const { items } = usePagination({
        count: trans.data.totalPages,
        onChange: (event,page) => handleChange(page)
      }) 

   const handleChange = (page) => {
        fetchRequests(page)
      };


        return (
            <div className='list-render'>
                {trans.loading ? <LoadingSpinner/> : 
                <div className='row'>
                <div className={`col ${ trans.query.hasNextPage ? 's11' : 's12'}`}>
                  {renderRequests()}
                  </div>
                {trans.data.hasNextPage ? 
                <div className='col l1 s1'>
                  {renderPagination(items)}
                </div> : null
                }  
                </div>
            }
            </div>
        )
    }
    

function mapStateToProps({ trans }) {
    return { trans }
}

export default connect(mapStateToProps, {fetchRequests})(TranslationList)
