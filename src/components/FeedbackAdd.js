import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StarRatingComponent from 'react-star-rating-component'
import Constants from '../constants'
import FormErrors from './FormErrors'

export default class FeedbackAdd extends Component {

  static defaultProps = {
    feedbacks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
				names: PropTypes.string.isRequired,
				email: PropTypes.string.isRequired,
				rating: PropTypes.number.isRequired,
				comment: PropTypes.string.isRequired,
				date: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    addFeedback: PropTypes.func.isRequired
  }

	_fields = {
		NAMES: 'names',
		EMAIL: 'email',
		RATING: 'rating',
		COMMENT: 'comment'
	}

	/**
	 * Store the local field reference
	 */
	_refs = []

	/**
	 * Set the default values and initialize the form listeners
	 */
	constructor(props, state) {
    super(props, state)
    this.state = {
			feedback: Constants.DEFAULT_FEEDBACK,
			formErrors: { names: '', 		email: '', 		rating: '', 	 comment: '' },
			validator:	{ names: false, email: false, rating: false, comment: false },
			formValid: false
		}

		this._onInputChange  = this._onInputChange.bind(this)
		this._onRatingChange = this._onRatingChange.bind(this)
		this._onSave 				 = this._onSave.bind(this)
  }

  /**
   * Display the Feedbacks.
   * @return {div}
   */
  render() {
		const { formErrors } = this.state
    return (
      <div className="feedbackAdd">
				<FormErrors formErrors={formErrors} />
				<form onSubmit={this._onSave}>
	        {this._getInputField(this._fields.NAMES)}
	        {this._getInputField(this._fields.EMAIL)}
					{this._getRatingField()}
					{this._getCommentField()}
					{this._getSubmitButton()}
				</form>
      </div>
    )
  }



	// -- Views

	_getInputField(names) {
		const value = this.state.feedback[names]
		return (
			<div className="fieldRow">
				<label>{ names }</label>
				<input
					ref				  	= { ref => this._refs[names] = ref }
					type		 			= { "text" }
					name		 			= { names }
					value		 			= { value }
					autoComplete	= { names }
					onChange 			= { Constants.SHOULD_VALIDATE_ON_TEXT_CHANGE ? this._onInputChange:()=>{} }
				/>
			</div>
		)
	}

	_getRatingField() {
		const { rating } = this.state
		return (
			<div className="fieldRow rating">
				<label>Rate</label>
				<StarRatingComponent
			    name					 = { this._fields.RATING }
					ref 					 = { ref => this._refs[this._fields.RATING] = ref }
			    value					 = { rating }
			    starCount			 = { 5 }
			    starColor			 = { "#ffb400" }
			    emptyStarColor = { "#fefefe" }
			    editing				 = { true }
					onStarClick		 = { Constants.SHOULD_VALIDATE_ON_TEXT_CHANGE ? this._onRatingChange:()=>{} }
				/>
			</div>
		)
	}

	_getCommentField() {
		const { comment } = this.state
		return (
			<div className="fieldRow">
				<label>Comment</label>
				<br/>
				<textarea
					name 		 = { this._fields.COMMENT }
					ref 		 = { ref => this._refs[this._fields.COMMENT] = ref }
					onChange = { Constants.SHOULD_VALIDATE_ON_TEXT_CHANGE ? this._onInputChange:()=>{} }
				>
					{ comment }
				</textarea>
			</div>
		)
	}

	_getSubmitButton() {
		return (
			<div className="fieldRow">
				<input type="submit" value="OK"/>
			</div>
		)
	}



	// -- Controllers

	_onInputChange(e) {
	  const { name, value } = e.target
		let feedback = this.state.feedback
				feedback[name] = value
	  this.setState({ feedback }, () => this._validateFields(name, value))
	}

	_onRatingChange(value, prevValue, name) {
		let feedback = this.state.feedback
				feedback[name] = value
	  this.setState({ feedback }, () => this._validateFields(name, value))
	}

	_validateFields(fieldName, value) {
		let formErrors = this.state.formErrors
	  let emailValid = this.state.validator.email
	  let nameValid = this.state.validator.names
		let ratingValid = this.state.validator.rating
		let commentValid = this.state.validator.comment

	  switch(fieldName) {
	    case this._fields.EMAIL:
	      emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
	      formErrors.email = emailValid ? '' : ' is invalid'
	      break
	    case this._fields.NAMES:
	      nameValid = value.length >= 2
	      formErrors.names = nameValid ? '' : ' is too short'
	      break
			case this._fields.RATING:
	      ratingValid = value > 0
	      formErrors.rating = ratingValid ? '' : ' is not selected'
	      break;
			case this._fields.COMMENT:
	      commentValid = value.length >= 10
	      formErrors.comment = commentValid ? '' : ' is too short'
	      break;
	    default:
	      break;
	  }
	  this.setState({
			formErrors,
      validator: {
				email: emailValid,
      	names: nameValid,
				rating: ratingValid,
				comment: commentValid
			}
    }, this._validateForm );
	}

	_validateForm() {
		const { validator } = this.state
	  this.setState({
			formValid: validator.email &&
								 validator.names &&
								 validator.rating &&
								 validator.comment || false
		})
	}

  /**
   * On form submit: control each fields content and fired an event for Redux with the feeback to insert
   * @param {Object} e onSubmit form event.
   * @return {Void}
   */
  _onSave(e) {
		e && e.preventDefault()
    const { addFeedback } = this.props
		const { feedback, formValid } = this.state
		let value, field
		for (var f in this._fields) {
			field = this._fields[f]
			value = this._refs[field].state &&
							this._refs[field].state.value ||
							this._refs[field].value
			this._validateFields(field, value)
		}
		if (formValid && feedback) {
    	addFeedback(feedback)
		}
  }

}
