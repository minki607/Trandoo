import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../actions'
import Header from "./Header";
import Landing from "./Landing";
import Translate from './Translate';
import TranslateNew from "./translation/Translate";





class App extends React.Component {


    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchLang();
    }

    render(){


        return (
            <div>
                <BrowserRouter>
                    <Header/>
                     <div className='container'>
                            <Route exact path="/" component={Landing}/>
                            <Route exact path='/translate' component={Translate}/>
                         <Route exact path='/translate/new' component={TranslateNew}/>
                      </div>
                </BrowserRouter>
                </div>
        )
    }

}

export default connect(null, actions)(App)