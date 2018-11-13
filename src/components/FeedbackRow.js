import React from 'react'
import PropTypes from 'prop-types'
import Rating from 'react-star-rating-component';

const FeedbackRow = ({ id, names, email, rating, comment, date }) =>
<section 
	key={ id } 
	className="feedbackRow">
	<h3>{ names }</h3>
  <h4>{ email } <i>(id: { id })</i></h4>
  <h6>{ date }</h6>
	<Rating
    name      = {`rating ${rating}`}
    editing   = {false}
    starCount = {5}
    value     = {rating}
  />
	<p>{comment}</p>
</section>

FeedbackRow.propTypes = {
  id: PropTypes.number,
  names: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.string
}

export default FeedbackRow
