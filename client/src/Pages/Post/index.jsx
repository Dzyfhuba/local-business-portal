import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Main from '../../Layouts/Main'
import {useLocalStorage} from '@rehooks/local-storage'
import axios from 'axios'
import Hosts from '../../Config/Hosts'

const Home = props => {
  const [posts, setPosts] = useLocalStorage('posts')
  
  useEffect(() => {
    axios.get(Hosts.main + '/post')
      .then(res => {
        console.log(res.data);
        if (res.data.status === 'success') setPosts(res.data.data)
        // if (res.data.status === 'error') console.log(res.data);
      })
      console.log(posts);
  }, [])

  return (
    <Main id="container">
      Post
    </Main>
  )
}

Home.propTypes = {
  auth: PropTypes.any
}

export default Home