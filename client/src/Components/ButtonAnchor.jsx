import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ButtonAnchor = props => {
  return (
    <Link to={props.to} className={`px-5 py-2.5 block text-center text-white rounded ${props.className}`}>{props.children}</Link>
  )
}

ButtonAnchor.propTypes = {
  children: PropTypes.any,
  to: PropTypes.string,
  className: PropTypes.string
}

export default ButtonAnchor