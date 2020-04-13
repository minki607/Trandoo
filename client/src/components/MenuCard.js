import React from 'react'
import {Link} from "react-router-dom";

const MenuCard = (props) => {
    return (
        <div className="col s12 m4">

            <div className="card horizontal">

                <div className="card-stacked">
                    <Link to={props.link} className="card-content">
                        <p>{props.title}</p>
                        <div className='post-count'>3</div>
                    </Link>

                    <div className="card-action">
                    </div>
                </div>
            </div>
        </div>
    )

}

export default MenuCard