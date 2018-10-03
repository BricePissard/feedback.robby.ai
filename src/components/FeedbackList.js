import React from 'react'
import PropTypes from 'prop-types'
import FeedbackRow from './FeedbackRow'

const FeedbackList = ({ feedbacks }) => {
	let _feedbacks = []
  feedbacks.map((feedback, id) => _feedbacks.push(<FeedbackRow key={id} { ...feedback } />))
  return (
    <div className="feedbackList">
      {_feedbacks.length > 0 ? _feedbacks : <h5>No Feedbacks found</h5>}
    </div>
  )
}

FeedbackList.propTypes = {
  feedbacks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      names: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
      date: PropTypes.string
    }).isRequired
  ).isRequired
}

export default FeedbackList
