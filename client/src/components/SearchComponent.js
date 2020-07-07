import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field, formValueSelector } from "redux-form";
import {submitSearch} from '../actions'
import LoadingSpinner from './LoadingSpinner'
import '../css/search.scss'
import { usePagination } from "@material-ui/lab/Pagination";
import renderPagination from './Pagination'
import renderPosts from './renderPosts';


const SearchInput = ({input}) => {
  return (
    <input {...input} id="search-bar" placeholder="Search..."/>
  )
}

let SearchComponent = ({trans, submitSearch, searchValue}) => {
    
  const [submitted, isSubmitted] = useState(false) //to check whether form has been submitted initially
  const [query, setQuery] = useState(null) //query word to display in not-found message
    
  const handleFormSubmit = (e) => {
       e.preventDefault();
       submitSearch(searchValue)
       setQuery(searchValue)
       isSubmitted(true)
    } 

    const renderResults = () => {
      return (
      
        trans.loading ? <LoadingSpinner/> : trans.query.docs && trans.query.docs.map(post => {
          return (
            renderPosts(post)
          )
      }
      )
      
    )
  }

  const { items } = usePagination({
    count: trans.query.totalPages,
    onChange: (event,page) => handleChange(page)
  }) 

const handleChange = (page) => {
    submitSearch(searchValue, page)
    console.log(trans)
  };

  const NotFound = () => {
    return (
      <div className='no-result setPref-container'>
      <div className='error-txt'>
                <h2 className='message'>No results found for query <span style={{color: '#cda8a8'}}>'{query}'</span></h2>
                <p className='message-2'>Try again with '{searchValue}'</p>
            </div>
        <img className='error-img' src='../images/not_found.png' alt='not_found'/> 
      </div>
    
    )
  }
    return (
      <Fragment>
        <form style={{display:'flex'}} onSubmit={(e)=> handleFormSubmit(e)} className="searchbox">
          <Field component={SearchInput} type='text' name='search'/>
          <button type="submit" style={{float:'right', border: 'none'}}><img className="search-icon" src='/images/search-icon.png' alt='search-icon'/></button>
        </form>
        <div>
          {(trans.query.docs && !trans.query.docs.length && submitted && !trans.loading) 
          ? NotFound(searchValue) 
          : <div className='row'>
                <div className={`col ${ trans.query.hasNextPage ? 's11' : 's12'}`}>
                  {trans.query.docs && !trans.loading ?<p className='total-docs'> {trans.query.totalDocs + ' results'}</p> : null}
                    {renderResults()}
                </div>    
                {!trans.loading && trans.query.docs && trans.query.hasNextPage?  
                <div className='col s1'>
                  {renderPagination(items)}
                </div>
                : null} 
                
            </div>
          }
        
        
        </div>
      </Fragment>
    ) 

}

function mapStateToProps({ trans }) {
  return { trans }
}

SearchComponent = reduxForm({
  form: 'searchForm',
  destroyOnUnmount: false
})(SearchComponent)
//form selector to directly reflect search value in current component
const selector = formValueSelector('searchForm')
SearchComponent = connect(state => {
  const searchValue = selector(state, 'search')
  return {
    searchValue
  }
})(SearchComponent)

SearchComponent = connect(mapStateToProps, {submitSearch})(SearchComponent)
export default SearchComponent
