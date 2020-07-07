import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchTodayList} from '../actions'
import LoadingSpinner from './LoadingSpinner'
import { usePagination } from "@material-ui/lab/Pagination";    
import renderPagination from './Pagination'
import renderPosts from './renderPosts'
import EmptyList from './EmptyList'



const AddedTodayList = ({trans ,fetchTodayList}) => {
    
    useEffect(() => {
        fetchTodayList()
    }, [])   

    const renderRequests = () => {
        return trans.today.docs && trans.today.docs.map((req) => {
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
        fetchTodayList(page)
      };
    
    const renderList = () => {
        if (trans.loading) {
            return (
                <LoadingSpinner/>
            )
        } else if (trans.today.docs && trans.today.docs.length && !trans.loading) {
            return (
                <div className='row'>
                    <div className={`col ${ trans.today.hasNextPage ? 's11' : 's12'}`}>
                        {renderRequests()}
                    </div>

                    {trans.data.hasNextPage ? 
                    <div className='col l1 s1'>
                        {renderPagination(items)} 
                    </div> : null}
                </div>    
            )
        } else {
            return (
                <EmptyList message='There is no request posted today' btnTitle='Post a Request' link='/translate/new'/>
            )
            
        }
    }  


        return (
            <div className='list-render'>
                {renderList()}
            </div>
    
        )
    }
    

function mapStateToProps({ trans }) {
    return { trans }
}

export default connect(mapStateToProps, {fetchTodayList})(AddedTodayList)
