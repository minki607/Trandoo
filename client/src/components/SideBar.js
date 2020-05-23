import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import useWindowSize from "../hooks/hooks.js";

export default function SideBar(props) {
  const [slider, setSlider] = useState(false);
  const size = useWindowSize();

  return (
    <Fragment>  
            <a
            href="#"
            className="card toggle-sidenav col s12 sidenav-trigger"
            onClick={() => setSlider(s => !s)}
            >
            <i className="material-icons left">{size.width > 1300 ? 'featured_video' : 'menu'}</i>
            <i className="material-icons right">notifications_none</i>
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
        {props.paths.map(elt => (
          <li onClick={() => setSlider(s => !s)}>
            <Link to={elt.path}>
            <i className="material-icons">{elt.icon}</i>
              {elt.name}
            </Link>
          </li>
        ))}
        <li>
          <div className="divider" />
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
          <li>
          <div className="divider" />
        </li>
          <a href="#!">
            Logout
          </a>
          
        </li>
      </ul>
    </Fragment>
  );
}
