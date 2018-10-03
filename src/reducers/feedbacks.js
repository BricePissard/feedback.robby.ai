import Constants from '../constants'
const localStorage_KEY = 'feedbacks'

/**
 * @exports {Array<Object>} feedbacks Array of Object of the all the feedbacks to display.
 */
let _feedbacks
const feedbacks = (state, action) => {
  switch (action.type) {

    // -- Add a new `feedback` to the current `feedbacks` list.
    case 'ADD_A_FEEDBACK':
      if (action.feedback) {
        let feedback = action.feedback
        _feedbacks = JSON.parse(localStorage.getItem(localStorage_KEY)) || [ ...state ]
        let id = parseInt(Math.max.apply(Math, _feedbacks.map(feed => feed.id))) || 0
        feedback.id = id >= 0 ? ++id : 0
        feedback.date = new Date().toISOString()
        _feedbacks.push(feedback)
        localStorage.setItem(localStorage_KEY, JSON.stringify(_feedbacks))
        return _feedbacks
      } else {
        return [ ...state ]
      }

    // -- Reorder the `feedbacks`.
    case 'FILTER_FEEDBACKS':
      const rating = parseInt(action.rating)
      _feedbacks = JSON.parse(localStorage.getItem(localStorage_KEY)) || [ ...state ]
      return rating === 0 ? _feedbacks : _feedbacks.filter(f => f.rating === rating)

    // -- Current `feedbacks` or by default create an Array of Object that contains
    // -- Get by default all the `feedbacks` stored in the Local Storage.
    default:
      // -- DEBUG -------------------------------
      //localStorage.removeItem(localStorage_KEY)
      // ----------------------------------------
      _feedbacks = JSON.parse(localStorage.getItem(localStorage_KEY)) || state
      return _feedbacks && _feedbacks.length ? _feedbacks : Constants.DEFAULT_FEEDBACKS
  }
}

export default feedbacks
