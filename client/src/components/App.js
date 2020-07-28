import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Header from './Header'
import Login from './Login'
import Landing from './Landing'
import Dashboard from './Dashboard'
import TranslateNew from './translation/Translate'
import Preference from './Preference'
import TagForm from './TagForm'
import ShowRequest from './ShowRequest'
import ShowTagPosts from './ShowTagPosts'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import io from 'socket.io-client'
import socketManager from './scoket.client'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Raleway, sans-serif'
  }
})

class App extends React.Component {
  state = {
    socket: null
  }
  componentDidMount() {
    this.props.fetchUser()
    this.props.fetchNotification()
    const socket = io('http://localhost:5000')
    socket.on('connect', async () => {
      this.setState({
        socket
      })
    })
    socketManager(socket, this.props)
  }

  render() {
    const { socket } = this.state
    const { updateReadNotifications } = this.props
    return (
      <div>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            {updateReadNotifications &&
              <Header updateNotifications={updateReadNotifications} />
            }
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/setPref' component={Preference} />
            <Route exact path='/admin' component={TagForm} />
            <Route exact path='/translate/tag/:name' component={ShowTagPosts} />
            <div className='container'>
              <Route
                exact
                path='/translate'
                socket={socket}
                component={Dashboard}
              />
              <Route exact path='/translate/new' component={TranslateNew} />
              {socket &&
                <Route
                  exact
                  path='/translate/view/:id'
                  render={props => <ShowRequest {...props} socket={socket} />}
                />
              }
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    )
  }
}
function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps, actions)(App)
