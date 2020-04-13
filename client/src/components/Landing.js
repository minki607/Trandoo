import React, {useState, useContext} from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/slider.css'
import SearchBar from "./SearchBar";
import MenuCard from "./MenuCard";
import * as actions from "../actions/types";
import {connect} from "react-redux";

class Landing extends React.Component  {

    z


    storeLang = (lang) =>{
    localStorage.setItem('language', lang)
    }

    render(){
        return (

            <div className='container'>
                <Slider
                    slidesToShow={4}
                    swipeToSlide={true}
                    focusOnSelect={true}
                >
                    <div className='language-sel' onClick={()=> this.storeLang('English')}><h4>English</h4></div>
                    <div className='language-sel' onClick={()=> this.storeLang('Korean')}><h4>KOREAN</h4></div>
                    <div className='language-sel'><h4>JAPANESE</h4></div>
                    <div className='language-sel'><h4>CHINESE</h4></div>
                    <div className='language-sel'><h4>SPANISH</h4></div>
                </Slider>
                <SearchBar/>


                <h4>{}</h4>
                <div className='row'>
                    <MenuCard title='Forum'/>
                    <MenuCard title='Translate' link='/translate'/>
                    <MenuCard title='Chat'/>
                </div>
            </div>

        );

    }

}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(Landing)
