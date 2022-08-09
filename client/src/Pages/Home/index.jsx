import React from 'react'
import PropTypes from 'prop-types'
import Main from '../../Layouts/Main'
import Welcome from '../../Containers/Welcome'
import About from '../../Containers/About'

const Home = () => {
  return (
    <Main id="container">
      <div className="-mt-16 -mb-5">
        <Welcome />
        <About />
      </div>
    </Main>
  )
}

Home.propTypes = {
  auth: PropTypes.any
}

export default Home