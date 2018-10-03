import { connect } from 'react-redux'
import FeedbackGraph from '../components/FeedbackGraph'

const mapStateToProps = state => ({
  feedbacks: state.feedbacks
})

export default connect(
  mapStateToProps
)(FeedbackGraph)
