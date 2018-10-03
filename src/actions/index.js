/**
 * Add a new feedback to the list.
 * @param {Object} feedback Recive the feedback object to add to the list of current feedbacks.
 */
export const addFeedback = feedback => ({
  type: 'ADD_A_FEEDBACK',
  feedback
})

/**
 * Filter and reduce the feedbacks to display.
 * @param {Number} rating Filter the feedbacks to display by number of stars, Default: 0 for all
 */
export const filterFeedbacks = (feedbacks, rating) => ({
  type: 'FILTER_FEEDBACKS',
  feedbacks,
  rating
})
