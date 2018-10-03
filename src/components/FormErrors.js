import React from 'react'
import PropTypes from 'prop-types'

const FormErrors = ({ formErrors }) =>
<div className='formErrors'>
  {Object.keys(formErrors).map((fieldName, i) =>
    (formErrors[fieldName].length > 0) ?
			<p key={i}>{fieldName} {formErrors[fieldName]}</p> : ''
  )}
</div>

FormErrors.propTypes = {
  formErrors: PropTypes.object.isRequired
}

export default FormErrors
