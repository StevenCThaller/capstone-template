import React from 'react'

const ReplyCard = ({reviewDetails}) => {
  return (
    <div className="review-container">
  {reviewDetails && reviewDetails.Replies?.length > 0 ? (
    reviewDetails.Replies.map((reply) => (
            <div className="review" key={reply._id}>
              <div className="user-info">
                <h4 className="user-name">User: {reply.username}</h4>
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