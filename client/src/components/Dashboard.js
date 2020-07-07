import React, {useState, useEffect, Fragment} from 'react'
import { useRef } from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field, formValueSelector } from "redux-form";
import { makeStyles } from "@material-ui/core/styles";
import TranslationList from './TranslationList'
import MenuCard from './MenuCard'
import LoadingSpinner from './LoadingSpinner'
import SideBar from './SideBar'
import '../css/translation_list.scss'
import '../css/dashboard.scss'
import '../css/search.scss'
import EmptyList from './EmptyList'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import {submitSearch} from '../actions'
import StatusBar from './StatusBar'
import { usePagination } from "@material-ui/lab/Pagination";
import renderPagination from './Pagination'
import renderPosts from './renderPosts';
import AddedTodayList from './AddedTodayList'



//Tabs from https://material-ui.com/components/tabs/ 
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{marginTop: '30px'}}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: "100%",
        position: 'sticky'
      },
    tab1: {
        maxWidth: "60%",
        width: "60%",
        backgroundColor:'#ebebeb',
      [theme.breakpoints.down("xs")]: {
        maxWidth: "100%",
        width: "100%",
      }
    }
    
  }));

//for search tab
const SearchInput = ({input}) => {
    return (
      <input {...input} id="search-bar" placeholder="Search..."/>
    )
  }

  

let Dashboard = ({auth, trans, searchValue, submitSearch}) => {

    const tabRef = useRef(null) //for referencing tab appbar
    const classes = useStyles();
    const [value, setValue] = useState(0); //for indexing tabs
    const [hasPref, setPref] = useState(false) //indicate whether user has set up preference
    const [submitted, isSubmitted] = useState(false) //to check whether form has been submitted initially
    const [query, setQuery] = useState(null) //query word to display in not-found message
        

   

    useEffect(() => {
        //if user has set up preference shown them recommended tab
        if (auth && auth.prefLanguage.length !== 0) {
          setValue(2);
          setPref(true)
        } else if (auth && auth.prefLanguage.length === 0){
          setValue(1);
          setPref(false)
        }
      }, [auth]); // Update if authState changes

    //handling tab changes  
    const handleChange = ( event, newValue) => {
        setValue(newValue)
        //scroll to end position of div prior to appbar (i.e starting point of sticky appbar)
        window.scrollTo({ left: 0, top: tabRef.current.offsetTop + tabRef.current.offsetHeight, behavior: 'smooth'}) 
        
      };

  

    //search form handle   
    const handleFormSubmit = (e) => {
        e.preventDefault();
        submitSearch(searchValue)
        setQuery(searchValue)
        isSubmitted(true)
     } 

     //rendering search results
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
  
    //pagination 
    const { items } = usePagination({
      count: trans.query.totalPages,
      onChange: (event,page) => handlePage(page)
    }) 
  
    //fetching paginated data
    const handlePage = (page) => {
      submitSearch(searchValue, page)
  
    };
    
    //to display when no matching result found 
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
                <div className='row'> 
                    <div className='col s12 l8' >
                            <SideBar title='User 1'/>
                            <div className='menu-button'>
                                <MenuCard title='Request Translation' link='/translate/new' icon='translate'/>
                                <MenuCard title='Live Translation' icon='chat'/>
                                <MenuCard title='Leaderboard' icon='stars'/>
                            </div>
                        <div>
                            <div className='reference' ref={tabRef}></div> {/* reference div just before appbar (starting point of appbar) */}
                            <AppBar className={classes.root}>
                                <Tabs TabIndicatorProps={{style: {background:'#e5e5e5'}}} 
                                        style={{backgroundColor:'#ccc2c7'}} value={value} 
                                        onChange={handleChange} 
                                        variant="scrollable"
                                        scrollButtons="off"
                                        aria-label="scrollable prevent tabs example">
                                <Tab
                                disableRipple
                                className={`${classes.tab1} tab1`}
                                icon={
                                <form style={{display:'flex'}} onSubmit={(e)=> handleFormSubmit(e)} className="searchbox">
                                    <Field component={SearchInput} type='text' name='search'/>
                                    <input src='/images/search-icon.png' 
                                        alt='search-icon' id='search-icon' type="image" style={{float:'right', border: 'none'}}>  
                                    </input>
                                </form>} {...a11yProps(0)} />
                                <Tab label="All" {...a11yProps(1)} />
                                <Tab label="Recommended" {...a11yProps(2)} />
                                <Tab label="Added Today" {...a11yProps(3)} />
                        
    
                                </Tabs>
                            </AppBar>
                               
                        <TabPanel value={value} index={0}> 
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
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <TranslationList/>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            {hasPref ? 'Recommended List' : <EmptyList message='You have not set up your preference yet' btnTitle='Set up Now' link='/setPref' />}
                        </TabPanel>

                        <TabPanel value={value} index={3}>
                            <AddedTodayList/> {/*<EmptyList message='There is no request posted today' btnTitle='Post a Request' link='/translate/new'/>*/}
                        </TabPanel>

                        
                        </div>
        
                    </div>
                    <div className='col s12 l4'>
                        <StatusBar/> 
                    </div>
                </div>
            </Fragment>
        )
}

function mapStateToProps(state) {
    return { auth: state.auth,
             trans: state.trans
     };
}

Dashboard = reduxForm({
    form: 'searchForm',
    destroyOnUnmount: false
  })(Dashboard)
  //form selector to directly reflect search value in current component
  const selector = formValueSelector('searchForm')
 Dashboard = connect(state => {
    const searchValue = selector(state, 'search')
    return {
      searchValue
    }
  })(Dashboard)
  
  Dashboard = connect(mapStateToProps, {submitSearch})(Dashboard)
  export default Dashboard