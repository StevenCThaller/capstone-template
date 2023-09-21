import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const ReplyCard = ({reviewDetails}) => {
  return (
    <div className="review-container">
  {reviewDetails && reviewDetails.Replies?.length > 0 ? (
    reviewDetails.Replies.map((reply) => (
            <div className="review" key={reply._id}>
              <div className="user-info">
                <h4 className="user-name">User: {reply.username}</h4>
                <div className="thumbs">
                    <FontAwesomeIcon className="icon-up" icon={faThumbsUp} />
                    <FontAwesomeIcon className="icon-down" icon={faThumbsDown} />
                  </div>
              </div>
              {reply.text ? (
                <>
                  <p>Comment: {reply.text}</p>
                </>
              ) : (
                <p>No Reply</p>
              )}
            </div>
          ))
        ) : (
          <p>No user replies yet. Start the conversation!</p>
        )}
      </div>
  )
}

export default ReplyCard