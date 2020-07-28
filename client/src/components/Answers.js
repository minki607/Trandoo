import React from 'react'
import '../css/answer.css'
import {
  AnswerContainer,
  Responses,
  AnswerItem,
  Comment
} from './Answer.components'
import { calcPosted } from '../util'

export const Answers = ({
  trans,
  title,
  postAnswer,
  postComment,
  editComment,
  deleteComment,
  acceptAnswer,
  commentLoading,
  answerLoading,
  acceptLoading,
  currentAcceptAnswer,
  currentComment,
  rest
}) => {
  const tags = rest?.tags?.map(tag => tag.name)
  const { answers, _id: translationId } = rest
  const sortItems = (items = []) => {
    return items.sort((A, B) => {
      const transformedA = new Date(A.createdOn)
      const transformedB = new Date(B.createdOn)
      return transformedA < transformedB
        ? 1
        : transformedA > transformedB
          ? -1
          : 0
    })
  }
  return (
    <AnswerContainer
      tags={tags || []}
      title={title}
      date={calcPosted(rest?.dateSent)}
      detail={rest?.body}
      answerLoading={answerLoading}
      translationId={translationId}
      postAnswer={postAnswer}
    >
      {answers?.length !== 0 &&
        <Responses commentsLength={answers?.length}>
          {answers?.length && sortItems(answers)?.map(answerItem => {
            const {
              _user,
              accepted,
              comments,
              createdOn,
              answer,
              _id
            } = answerItem
            const { name } = _user
            return (
              <AnswerItem
                key={_id}
                name={name}
                acceptAnswer={acceptAnswer}
                date={calcPosted(createdOn)}
                commentLoading={answerLoading}
                answerId={_id}
                postComment={postComment}
                translationId={translationId}
                acceptLoading={acceptLoading}
                currentAcceptAnswer={currentAcceptAnswer}
                status={accepted}
                commentsLength={comments?.length}
                answer={answer}
                {...answerItem}
              >
                {comments?.length !== 0 && sortItems(comments)?.map(commentItem => {
                  const {
                    _user: commentUser,
                    comment,
                    createdOn,
                    _id: commentId
                  } = commentItem
                  return (
                    <Comment
                      translationId={translationId}
                      currentComment={currentComment}
                      commentLoading={commentLoading}
                      key={commentId}
                      name={commentUser.name}
                      editComment={editComment}
                      deleteComment={deleteComment}
                      comment={comment}
                      commentId={commentId}
                      date={calcPosted(createdOn)}
                    />
                  )
                })}
              </AnswerItem>
            )
          })}
        </Responses>
      }
    </AnswerContainer>
  )
}
export default Answers

