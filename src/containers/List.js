import { connect } from 'react-redux'
import FeedbackList from '../components/FeedbackList'

const mapStateToProps = state => ({
  feedbacks: state.feedbacks
})

export default connect(
  mapStateToProps
)(FeedbackList)
