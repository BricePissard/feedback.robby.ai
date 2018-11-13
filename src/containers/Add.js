
import { connect } from 'react-redux'
import { addFeedback } from '../actions'
import FeedbackAdd from '../components/FeedbackAdd'

const mapStateToProps = state => ({
  feedbacks: state.feedbacks
})

const mapDispatchToProps = dispatch => ({
  addFeedback: feedback => dispatch(addFeedback(feedback))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackAdd)
