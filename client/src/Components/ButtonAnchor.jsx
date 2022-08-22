import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ButtonAnchor = props => {
  const {className, to, children, ...rest} = props
  return (
    <Link to={to} className={`px-5 py-2.5 block text-center rounded ${className}`} {...rest}>{children}</Link>
  )
}

ButtonAnchor.propTypes = {
  children: PropTypes.any,
  to: PropTypes.string,
  className: PropTypes.string,
}

export default ButtonAnchor