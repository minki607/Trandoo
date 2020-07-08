import React from 'react'
import { PieChart } from 'react-minimal-pie-chart';

const StatusBar = () => {

    return (
            <div className="tasks panel">
                    <header>
                    <h6> Tasks </h6>
                    <div className="options">
                        <div> This Month  <i className="material-icons">arrow_drop_down</i> </div>
                    </div>
                    </header>
                    {/* Tasks content */}
                    <div className="content">
                    <div className="overall-status">
                        <ul className="status-list">
                        <li> 
                            <label className="label-name"> Total </label>
                            <h4 className="count"> 167 </h4>
                        </li>
                        <li> 
                            <span className="dot translated"> </span>
                            <label className="label-name"> Translated </label>
                            <h4 className="count"> 80 </h4>
                        </li>
                        <li> 
                            <span className="dot selected"> </span>
                            <label className="label-name"> Selected </label>
                            <h4 className="count"> 47 </h4>
                        </li>

                        <li> 
                            <span className="dot quality"> </span>
                            <label className="label-name"> Quality </label>
                            <h4 className="count"> 40 </h4>
                        </li>

                    
                        </ul>
                
                        <PieChart
                        style= {{marginLeft: '30px'}}
                        
                        data={[
                            { title: 'Translated', value: 80, color: '#cdc2c7' },
                            { title: 'Selected', value: 47, color: '#70d18f' },
                            { title: 'Quality', value: 40, color: '#ffbc35' },
                        ]}
                        />
                
                    </div>

                        <header> 
                        
                        <h6> Recently Asked </h6>
                        <i className="fa fa-ellipsis-h icon"> </i>
                        </header>
                    

                    <div className="managers">
                    <ul className="list">
                    
                        <li> 
                            <img src="https://source.unsplash.com/40x40/?nathan" alt="user" className="user-img" />
                            <div className="text"> 
                            <h4 className="name">  post 1 </h4>
                            <h4> 3213213 </h4>
                            </div>
                            <h4 className="status"> post 1 </h4>
                        </li>
                        <li> 
                            <img src="https://source.unsplash.com/40x40/?andrea" alt="user" className="user-img" />
                            <div className="text"> 
                            <h4 className="name"> post 2 </h4>
                            <h4> post 2 </h4>
                            </div>
                            <h4 className="status"> post 2 </h4>
                        </li>
                        </ul>
                    </div>
                    <div className="seemore">
                        See more
                    </div>						

                    <header> 
                        <h6> Recently Translated </h6>
                        <i className="fa fa-ellipsis-h icon"> </i>
                        </header>
                    

                    <div className="managers">
                    <ul className="list">
                        <li> 
                            <img src="https://source.unsplash.com/40x40/?nathan" alt="user" className="user-img" />
                            <div className="text"> 
                            <h4 className="name">  post 3</h4>
                            <h4> 321321 </h4>
                            </div>
                            <h4 className="status"> post 3 </h4>
                        </li>
                        <li> 
                            <img src="https://source.unsplash.com/40x40/?andrea" alt="user" className="user-img" />
                            <div className="text"> 
                            <h4 className="name">  post 4 </h4>
                            <h4>312321</h4>
                            </div>
                            <h4 className="status"> post4 </h4>
                        </li>
                        </ul>
                    </div>
                    <div className="seemore">
                        See more
                    </div>						

                    </div>
                </div> 
    )
}

export default StatusBar




