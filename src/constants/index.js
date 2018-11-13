/**
 * Defines here the default values:
 * @param {Boolean} 			SHOULD_VALIDATE_ON_TEXT_CHANGE 	Should we process to an add feedback form validation while text change
 * @param {Object} 				DEFAULT_FEEDBACK 								The default feedback to add.
 * @param {Array<Object>} NUM_FEEDBACKS 									The default Array of feedbacks to display.
 */
export default {
	SHOULD_VALIDATE_ON_TEXT_CHANGE: true,
	DEFAULT_FEEDBACK: { names: '', email: '', rating: 0, comment: '' },
	DEFAULT_FEEDBACKS: []
}
