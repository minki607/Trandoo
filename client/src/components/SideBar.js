import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import useWindowSize from "../hooks/hooks.js";

export default function SideBar(props) {
  const [slider, setSlider] = useState(false);
  const size = useWindowSize();

  const menuPaths = [
    {
      name: 'Dashboad',
      path: '/',
      icon: 'dashboard'
    },
    {
      name: 'My Request',
      path: '/request',
      icon: 'assignment'
    },
    {
      name: 'My Answer',
      path: '/answer',
      icon: 'rate_review'

    }
    
  ];

  return (
    <Fragment>  
            
      <a href="#"
         className="toggle-sidenav"
         onClick={() => setSlider(s => !s)}>
        <div className='menu-icons'>
            <i className="material-icons">{size.width > 1300 ? 'featured_video' : 'menu'}</i>
            {/*<i className="material-icons">notifications_none</i> */}
        </div>    
      </a>
     
    
      <div
        className="sidenav-overlay"
        onClick={() => setSlider(s => !s)}
        style={{
          display: slider && size.width < 1300 ? "block" : "none",
          opacity: "1"
        }}
      />
      <ul
        id="slide-out"
        className="sidenav"
        style={{  
          transform: slider || size.width >= 1300 ? "translateX(0%)" : "",
          transitionProperty: "transform",
          transitionDuration: ".25s"
        }}
      >
        <li>
          <h4>{props.title}</h4>
        </li>

        {menuPaths.map((elt,i) => (
          <li key={i} onClick={() => setSlider(s => !s)}>
            <Link to={elt.path}>
            <i className="material-icons">{elt.icon}</i>
              {elt.name}
            </Link>
          </li>
        ))}
        
        <li>
          <div className="divider"/>
        </li>

        <li>
            <a className="subheader">Account</a>
        </li>

        <li>
            <a href="#!">
              Manage Profile
            </a>
            <a href="#!">
              Charge Credits
            </a>
        </li>

         <li>
            <div className="divider" />
        </li>
        
        <li>
            <a href="#!">
            Logout
            </a> 
        </li>
      </ul>
    </Fragment>
  );
}
