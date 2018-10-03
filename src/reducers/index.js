import { combineReducers } from 'redux'
import feedbacks from './feedbacks'

/**
 * Defines the default states with their reducers handlers.
 * @exports {Array<Object>} feedbacks list of feedbacks objects.
 */
export default combineReducers({
  feedbacks
})
