import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import '../css/detail.css'
import { connect } from 'react-redux'
import {
  fetchRequest,
  postAnswer,
  updateReadNotifications,
  fetchRequestAsync,
  postComment,
  editComment,
  deleteComment,
  acceptAnswer
} from '../actions'
//import SideBar from './SideBar'
import Loading from './LoadingSpinner'
import ReactHtmlParser from 'react-html-parser' // to render html tags
import { calcPosted } from '../util'
import Answers from './Answers'
import MuiAlert from '@material-ui/lab/Alert'

class ShowRequest extends Component {
  state = {
    newContentMessage: ''
  }
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchRequest(id)
    this.props.updateReadNotifications(id)
  }

  updateRequestWithIncommingInfo(translation) {
    const { id } = this.props.match.params
    // if (translation === id) {
    this.props.fetchRequestAsync(id)

    // }
  }

  componentDidUpdate(prevProps) {
    const nextProps = this.props
    // if (!prevProps.socket && nextProps.socket) {
    //   const { socket } = nextProps
    //   socket.on('answerPosted', ({ translation }) => {
    //     this.updateRequestWithIncommingInfo(translation)
    //   })
    //   socket.on('commentPosted', ({ translation }) => {
    //     this.updateRequestWithIncommingInfo(translation)
    //   })
    //   socket.on('answerAccepted', ({ translation }) => {
    //     this.updateRequestWithIncommingInfo(translation)
    //   })
    //   socket.on('commentUpdate', ({ translationId }) => {
    //     this.updateRequestWithIncommingInfo(translationId)
    //   })
    //   this.forceUpdate()
    // }
    if (
      prevProps.trans.loadingAsyncRequest &&
      !nextProps.trans.loadingAsyncRequest
    ) {
      this.refreshPageAfterRequestUpdate()
    }
  }

  implementNewContentLoaded() {
    setTimeout(
      () =>
        this.setState({
          newContentMessage: ''
        }),
      6000
    )
  }

  refreshPageAfterRequestUpdate() {
    this.setState(
      {
        newContentMessage:
          'You have new notifications kindly refresh your browser if it does not popup in the next few seconds.'
      },
      () => {
        this.forceUpdate()
        this.implementNewContentLoaded()
      }
    )
  }

  render() {
    const {
      trans,
      postAnswer,
      postComment,
      editComment,
      deleteComment,
      acceptAnswer,
      socket
    } = this.props
    const {
      answerLoading,
      acceptLoading,
      commentLoading,
      currentAcceptAnswer,
      currentComment
    } = trans
    const { answer } = this.state
    const { single = {} } = trans
    return (
      <>
        {socket && (
          <div>
            <div className='show-request-page'>
              {trans.loading ? (
                <Loading />
              ) : (
                  <div className='row'>
                    {this.state.newContentMessage && (
                      <div
                        className='row'
                        dtyle={{
                          display: 'flex',
                          justifyContent: 'center',
                          width: '100%',
                          margin: '10px 0px'
                        }}>
                        <MuiAlert elevation={6} variant='filled' severity='info'>
                          {this.state.newContentMessage}
                        </MuiAlert>
                      </div>
                    )}
                    <div className='row answers'>
                      {single && (
                        <Answers
                          title={trans.single.title}
                          trans={ReactHtmlParser(trans?.single?.body)}
                          postAnswer={postAnswer}
                          postComment={postComment}
                          editComment={editComment}
                          deleteComment={deleteComment}
                          acceptAnswer={acceptAnswer}
                          commentLoading={commentLoading}
                          answerLoading={answerLoading}
                          acceptLoading={acceptLoading}
                          translationId={single._id}
                          currentAcceptAnswer={currentAcceptAnswer}
                          currentComment={currentComment}
                          rest={single}
                        />
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </>
    )
  }
}
function mapStateToProps({ trans }) {
  return { trans }
}

export default connect(mapStateToProps, {
  fetchRequest,
  updateReadNotifications,
  postAnswer,
  fetchRequestAsync,
  postComment,
  editComment,
  deleteComment,
  acceptAnswer
})(ShowRequest)
