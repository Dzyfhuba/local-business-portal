import React from 'react'
import PropTypes from 'prop-types'
import Main from '../../Layouts/Main'
import Welcome from '../../Containers/Welcome'
import About from '../../Containers/About'
import { Helmet } from 'react-helmet-async'
import Var from '../../Config/Var'

const Home = () => {
  return (
    <Main id="container">
      <Helmet>
        <title>{`${Var.APP_NAME}`}</title>
        <meta name='description' content='Portal UMKM Desa Bululanjang Sangkapura Bawean adalah sebuah aplikasi website yang menampung sejumlah informasi-informasi tentang UMKM di desa Bululanjang untuk mempromosikannya ke internet dengan lebih luas dan membawa nama Bululanjang sebagai pusat bisnisnya.' />
      </Helmet>
      <div className="-mt-14">
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