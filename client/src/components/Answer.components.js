import React from 'react'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import ReactHtmlParser from 'react-html-parser'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'



const Button = ({ loading = false, ...rest }) => (
  <button {...rest} className='btn'>
    {loading ? 'Loading...' : 'Submit'}
  </button>
)
const ActionBtn = ({ children, loading = false, ...rest }) => (
  <div className='callout' {...rest}>
    {loading && 'Loading...'}
    {!loading && children}
  </div>
)

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: '#fff',
    border: null,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

export const AnswerModal = ({ children, open, handleClose }) => {
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'>
      <div style={modalStyle} className={classes.paper}>
        {children}
      </div>
    </Modal>
  )
}

export const AnswerContainer = ({
  children,
  tags,
  title,
  date,
  detail,
  answerLoading,
  translationId,
  postAnswer
}) => {
  const [answerModalIsOpen, setAnswerModalIsOpen] = React.useState(false)
  const toggleModal = () => setAnswerModalIsOpen(!answerModalIsOpen)
  const [answerItem, setAnswerItem] = React.useState('')

  const submitAnswer = () => {
    postAnswer(translationId, answerItem)
    setAnswerItem('')
    setAnswerModalIsOpen(false)
  }

  return (
    <div className='answer-section'>
      <AnswerModal open={answerModalIsOpen} handleClose={toggleModal}>
        <div className='modal-container'>
          <h3> Provide an answer to this translation</h3>
          <textarea rows='120' value={answerItem} onChange={(e) => setAnswerItem(e.target.value)} cols='100' placeholder='Post an answer' />
          <button className='btn' pending={answerLoading} onClick={submitAnswer}>Submit</button>
        </div>
      </AnswerModal>
      <div className='tag-container'>
        {tags.map((tag, index) => (
          <span key={`${tag}-${index}`}>{tag}</span>
        ))}
      </div>
      <div className='translation-req'>
        <div className='trans-block'>
          <div class='text-container'>
            <h2>{title}</h2>
          </div>
        </div>
        <div className='extra-info'>
          <div className='callout'>{date}</div>
          <ActionBtn onClick={toggleModal}>
            Answer Request
          </ActionBtn>
        </div>
      </div>

      <div className='main-translation'>{ReactHtmlParser(detail)}</div>
      {children}
    </div>
  )
}

export const Responses = ({ children, commentsLength }) => (
  <div className='responses-container'>
    <div className='inner'>
      <div className='left'>
        <div>
          <ArrowDropUpIcon
            style={{
              color: '#988c92',
              marginBottom: '-30px',
              fontSize: 40,
              padding: '0px'
            }}
          />
          <div style={{ margin: '10px 0px', color: '#988c92' }}>
            {' '}
            {commentsLength}
          </div>
          <ArrowDropDownIcon
            style={{
              fontSize: 40,
              marginTop: '-30px',
              color: '#988c92',
              padding: '0px'
            }}
          />
        </div>
      </div>
      <div className='right'>{children}</div>
    </div>
  </div>
)

export const AnswerItem = ({
  children,
  name,
  answer,
  date,
  status,
  commentsLength,
  postComment,
  acceptAnswer,
  commentLoading,
  answerId,
  translationId,
  acceptLoading,
  currentAcceptAnswer,
  ...rest
}) => {
  const { accepted } = rest
  const [commentModalIsOpen, setCommentModalIsOpen] = React.useState(false)
  const toggleModal = () => setCommentModalIsOpen(!commentModalIsOpen)
  const [commentItem, setCommentItem] = React.useState('')

  const submitComment = () => {
    if (!commentLoading) {
      postComment(commentItem, answerId, translationId)
      setCommentItem('')
      setCommentModalIsOpen(false)
    }
  }

  const toggleAccept = () => {
    !(acceptLoading && currentAcceptAnswer === answerId) && acceptAnswer(answerId, translationId, !accepted)
  }

  return (
    <div className='answer-box'>
      <AnswerModal open={commentModalIsOpen} handleClose={toggleModal}>
        <div className='modal-container'>
          <h3> Post your comment here </h3>
          <textarea rows='120' cols='100' onChange={(e) => setCommentItem(e.target.value)} value={commentItem} placeholder='Post an answer' />
          <Button loading={commentLoading} onClick={submitComment} />
        </div>
      </AnswerModal>
      <div className='answer-details'>
        <div className='name-info-accept'>
          <h2>{name}</h2>
          {accepted && !(acceptLoading && currentAcceptAnswer === answerId) &&
            <DoneAllIcon
              style={{
                fontSize: 40,
                color: green[300],
                padding: '0px'
              }}
            />
          }
          {
            acceptLoading && currentAcceptAnswer === answerId &&
            <CircularProgress style={{
              fontSize: 40,
              color: green[300],
              padding: '0px'
            }} />
          }

        </div>
        <p>{answer}</p>
      </div>
      <div className='answer-row-details'>
        <div className='details'>
          <span>{date}</span>
          <span>{status}</span>
        </div>
        <div className='details'>
          <ActionBtn className='callout answer-btn' onClick={toggleModal}>
            Commnent
          </ActionBtn>
          <ActionBtn loading={acceptLoading && currentAcceptAnswer === answerId} onClick={toggleAccept} className='callout answer-btn'>{!accepted ? 'Accept Answer' : 'Reject Answer'} </ActionBtn>
          <span>{commentsLength} Comments </span>
          <span> See more</span>
        </div>
      </div>
      {children}
    </div>
  )
}

export const Comment = ({ comment, date, name, translationId, commentLoading, commentId, currentComment, editComment, deleteComment }) => {

  const deleteThisComment = () => {
    deleteComment(commentId, translationId)
  }
  const [commentModalIsOpen, setCommentModalIsOpen] = React.useState(false)
  const toggleModal = () => setCommentModalIsOpen(!commentModalIsOpen)
  const [commentItem, setCommentItem] = React.useState(comment)

  const submitComment = () => {
    if (!commentLoading) {
      editComment(commentId, commentItem, translationId)
      setCommentModalIsOpen(false)
    }
  }
  return (
    <div className='comments'>
      <AnswerModal open={commentModalIsOpen} handleClose={toggleModal}>
        <div className='modal-container'>
          <h3> Post your comment here </h3>
          <textarea rows='120' cols='100' onChange={(e) => setCommentItem(e.target.value)} value={commentItem} placeholder='Post an answer' />
          <Button pending={commentLoading} onClick={submitComment} />
        </div>
      </AnswerModal>

      <h2>{name}</h2>
      <p>{comment}</p>
      <section>
        <div>Commented {date}</div>
        <div className="tool-row">
          <IconButton
            onClick={deleteThisComment}
            style={{
              margin: '0 5px'
            }} aria-label="delete">
            {commentLoading && currentComment === commentId ? (<CircularProgress style={{
              fontSize: '0.7rem',
              color: green[300],
              padding: '0px'
            }} />) : <DeleteIcon style={{ fontSize: 20, color: '#988c92' }} />}
          </IconButton>
          {!commentLoading && (<IconButton
            onClick={toggleModal}
            style={{
              margin: '0 5px'
            }} aria-label="delete">
            {commentLoading && currentComment === commentId ? (<CircularProgress style={{
              fontSize: '0.7rem',
              color: green[300],
              padding: '0px'
            }} />) : <EditIcon style={{ fontSize: 20, color: '#988c92' }} />}
          </IconButton>)}
        </div>
      </section>
    </div>
  )
}
