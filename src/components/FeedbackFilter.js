import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class FeedbackAdd extends PureComponent {

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
    filterFeedback: PropTypes.func.isRequired
  }

	/**
	 * Set the default values and initialize the form listeners
	 */
	constructor(props, state) {
    super(props)
    this.state = {
			selected: 0
		}
		this._onInputChange = this._onInputChange.bind(this)
  }

  /**
   * Display the Feedbacks.
   * @return {div}
   */
  render() {
		return (
      <div className="feedbackFilter">
				<form onSubmit={e => e.preventDefault()}>
					<h6>Display</h6>
					{[0,1,2,3,4,5].map(i=>this._getInputRadio(i))}
				</form>
      </div>
    )
  }


	// -- Views

	/**
	 * Get a selectable radio button
	 * @param {Number} num
	 * @return {Span}
	 */
	_getInputRadio(num) {
		const selected = parseInt( this.state.selected )
		const name = `filter_${num}`
		let label = num === 0 ? 'ALL' : ''
		if (num > 0) {
			for (var i = 1; i<=num; i++) {
				label += "★"
			}
		}
		return (
			<span key={num}>
				<label
					className = { selected === num ? "selected":"" }
					htmlFor 	= { num }>{label}</label>
				<input
					type		 	= { "radio" }
					name		 	= { name }
					value		 	= { num }
					id 			 	= { num }
					checked	 	= { selected === num ? "checked":"" }
					onChange 	= { this._onInputChange }
				/>
			</span>
		)
	}



	// -- Controllers

	_onInputChange(e) {
	  const selected = parseInt(e.target.value)
		const { filterFeedbacks, feedbacks } = this.props
	  this.setState({ selected }, () => {
			filterFeedbacks(feedbacks, selected)
		})
	}

}
