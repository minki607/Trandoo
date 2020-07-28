import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {fetchRecommendedList, filterRecommendedList} from '../actions'
import LoadingSpinner from './LoadingSpinner'
import { usePagination } from "@material-ui/lab/Pagination";    
import renderPagination from './Pagination'
import renderPosts from './renderPosts'
import EmptyList from './EmptyList'
import Tooltip from '@material-ui/core/Tooltip';
import Slider from "react-slick";



const Recommended = ({auth, trans, fetchRecommendedList, filterRecommendedList}) => {
    useEffect(() => {
        fetchRecommendedList()
    }, [])   

    const renderRequests = () => {
        //indicate render mode by forRecommend flag
        const forRecommend = true
        return trans.recommend.docs && trans.recommend.docs.map((req) => {
            return (
            renderPosts(req, forRecommend)
            )
        })
    }

    const { items } = usePagination({
        count: trans.recommend.totalPages,
        onChange: (event,page) => handleChange(page)
      }) 

    const handleChange = (page) => {
        fetchRecommendedList(page)
      };
    
      const settings = {
        arrows: false,
        infinite: false,
        slidesToShow: 1,
        enterMode: true,
        variableWidth: true
      };

    //to display recommendation list for language match
    const renderLanguageList = () => {
        if (trans.loading) {
            return (
                <LoadingSpinner/>
            )
            
        } else if (trans.recommend.docs && trans.recommend.docs.length && !trans.loading) {
            return (
                <div className='row'>
                    <div className={`col ${ trans.recommend.hasNextPage ? 's13' : 's12'}`}>
                        {renderRequests()}
                    </div>

                    {trans.recommend.hasNextPage ? 
                    <div className='col l1 s1'>
                        {renderPagination(items, true)} 
                    </div> : null}
                </div>    
            )
        } else {
            return (
                <EmptyList message='No Recommended Post' btnTitle='Refine Preference' link='/translate/setPref'/>
            )
        }
    }
    
     //to display recommendation list for tag match


        return (
            <div className='list-render'>
               <div className='preference-bar'>
                    <Slider {...settings}>
                            <div onClick={()=> fetchRecommendedList()} className='fetch-list'>ALL</div>
                            {auth.prefLanguage.map((languageSet, i) => {
                                 let languageList = [] 
                                return (
                                    <div key={i}>
                                        <button onClick={()=> filterRecommendedList(1, languageSet)} className='language_set'>
                                                    <span className='main-language'>{languageSet.title.name}</span><span className='main-arrow'></span>  
                                                    {languageSet.translate.map((target, idx) => {      
                                                        if (idx < 2){
                                                            return (
                                                                <span key={target.code} className='translatable'>
                                                                    {target.name}
                                                                </span>
                                                           )
                                                        }
                                                        //if there are more than 3 target language, push to array list
                                                        //increase the counter
                                                        else { 
                                                            languageList.push(target.name)
                                                        }
                                                    })}

                                                    {/*display counter and use tooltip to display additional languages*/}
                                                    {languageList.length !== 0 ? <Tooltip title={languageList.map((lang,i)=> { 
                                                        if (languageList.length === i+1) { 
                                                            return (lang)
                                                        } else {
                                                            return (lang+", ") 
                                                        }
                                                        })}>

                                                        <span className='list-length'>+{languageList.length}</span>
                                                    </Tooltip> : null}        
                                            </button>    
                                        </div>
                                    )   
                                })    
                            }
                        </Slider>
                   </div>
                {renderLanguageList()}
        
            </div>
    
        )
}

function mapStateToProps({ trans, auth }) {
    return { trans, auth }
}

export default connect(mapStateToProps, {fetchRecommendedList, filterRecommendedList})(Recommended)


    


