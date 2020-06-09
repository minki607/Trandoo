import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../actions'
import Header from './Header';
import Login from './Login';
import Landing from './Landing';
import Translate from './Translate';
import TranslateNew from './translation/Translate';
import Preference from './Preference'
import ShowRequest from './ShowRequest';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    typography: {
      fontFamily: 'Raleway, sans-serif',
    },

  });

class App extends React.Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render(){
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Header/>
                        <Route exact path='/' component={Landing}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/setPref' component={Preference}/>
                        <div className='container'>
                                <Route exact path='/translate' component={Translate}/>
                                <Route exact path='/translate/new' component={TranslateNew}/>
                                <Route exact path='/translate/view/:id' component={ShowRequest}/>    
                        </div> 
                    </BrowserRouter>
                </ThemeProvider>
         
                </div>
        )
    }
}

export default connect(null, actions)(App)