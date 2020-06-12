import React, {Fragment} from 'react'
import TranslationList from './TranslationList'
import RecentList from './RecentList'
import TagList from './TagList'
import RecommendedList from './RecommendedList'
import MenuCard from './MenuCard'
import useWindowSize from "../hooks/hooks.js";
import SideBar from './SideBar'
import '../css/translation_list.css'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

//Tabs from https://material-ui.com/components/tabs/ 
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  indicator: {
      backgrondColor: 'white',
      color: 'white'
  }
}));



const Translate = () => {

    const size = useWindowSize();
    const classes = useStyles();
    const [value, setValue] = React.useState(1);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  

        return (
        
            <Fragment>

                <div className='row'> 
                    <div className='col s12 l8' >
                        <div className={`menu ${(size.width >= 1300 && size.width <= 1700)  ? 'empty-margin' : ''}`}>
                            <SideBar title='User 1'/>
                            <div className='menu-button'>
                                <MenuCard title='Request Translation' link='/translate/new' icon='translate'/>
                                <MenuCard title='Live Translation' icon='chat'/>
                                <MenuCard title='Leaderboard' icon='stars'/>
                            </div>
                        </div>
                        <div className={`trans-list ${(size.width >= 1300 && size.width <= 1700)  ? 'empty-margin' : ''}`}>
                      

                        <div className={classes.root}>
                        <AppBar position="static">
                            <Tabs TabIndicatorProps={{style: {background:'#e5e5e5'}}} style={{backgroundColor:'#ccc2c7'}} value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="All" {...a11yProps(0)} />
                            <Tab label="Recommended" {...a11yProps(1)} />
                            <Tab label="Added Today" {...a11yProps(2)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            <TranslationList/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            my name is
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Item Three
                        </TabPanel>
                        </div>
                    
                        
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



export default Translate
