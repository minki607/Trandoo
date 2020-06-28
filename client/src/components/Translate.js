import React, {useState, useEffect, Fragment} from 'react'
import {connect} from 'react-redux'
import TranslationList from './TranslationList'
import RecentList from './RecentList'
import TagList from './TagList'
import RecommendedList from './RecommendedList'
import MenuCard from './MenuCard'
import SideBar from './SideBar'
import '../css/translation_list.css'
import EmptyList from './EmptyList'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import SearchComponent from './SearchComponent'


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
        <Box p={3}>
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

const Translate = ({auth}) => {

    
    const [value, setValue] = useState(0); //for indexing tabs
    const [hasPref, setPref] = useState(false)
    
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

    
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
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
                        <AppBar position="static">
                            <Tabs TabIndicatorProps={{style: {background:'#e5e5e5'}}} 
                                    style={{backgroundColor:'#ccc2c7'}} value={value} 
                                    onChange={handleChange} 
                                    variant="scrollable"
                                    scrollButtons="off"
                                    aria-label="scrollable prevent tabs example">
                            <Tab style={{backgroundColor:'#ebebeb'}} icon={ <i style={{color:'#b1a5aa'}} className="material-icons">search</i>}{...a11yProps(0)} />
                            <Tab label="All" {...a11yProps(1)} />
                            <Tab label="Recommended" {...a11yProps(2)} />
                            <Tab label="Added Today" {...a11yProps(3)} />
                            
 
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            <SearchComponent/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <TranslationList/>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            {hasPref ? 'Recommended List' : <EmptyList message='You have not set up your preference yet' btnTitle='Set up Now' link='/setPref' />}
                        </TabPanel>

                        <TabPanel value={value} index={3}>
                            {<EmptyList message='There is no request posted today' btnTitle='Post a Request' link='/translate/new'/>}
                        </TabPanel>

                        
                        </div>
        
                    </div>
                    <div className='col s12 l4'>
                        <RecommendedList/>
                        <RecentList/>
                        <TagList/>
                    </div>
                </div>
            </Fragment>
        )
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Translate)

