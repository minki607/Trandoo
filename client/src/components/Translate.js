import React, {Fragment} from 'react'
import TranslationList from './TranslationList'
import RecentList from './RecentList'
import TagList from './TagList'
import RecommendedList from './RecommendedList'
import MenuCard from './MenuCard'
import useWindowSize from "../hooks/hooks.js";
import SideBar from './SideBar'
import '../css/translation_list.css'



const Translate = () => {

    const size = useWindowSize();

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
                        <TranslationList/>
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
