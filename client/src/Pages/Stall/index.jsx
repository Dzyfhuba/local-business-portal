import React from 'react'
import PropTypes from 'prop-types'
import Main from '../../Layouts/Main'

const Home = props => {
  return (
    <Main id="container">
      Stall
    </Main>
  )
}

Home.propTypes = {
  auth: PropTypes.any
}

export default Home