import { connect } from 'react-redux'
import { filterFeedbacks } from '../actions'
import FeedbackFilter from '../components/FeedbackFilter'

const mapStateToProps = state => ({
  feedbacks: state.feedbacks
})

const mapDispatchToProps = dispatch => ({
  filterFeedbacks: (feedbacks, rating) => dispatch(filterFeedbacks(feedbacks, rating))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackFilter)
