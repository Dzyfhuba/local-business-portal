import React from 'react'
import PropTypes from 'prop-types'
import Main from '../../Layouts/Main'

const Home = props => {
  return (
    <Main>
      <div id="container" className='mx-5 mt-3'>
        Stall
      </div>
    </Main>
  )
}

Home.propTypes = {
  auth: PropTypes.any
}

export default Home