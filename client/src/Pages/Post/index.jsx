import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Main from '../../Layouts/Main'
import { useLocalStorage } from '@rehooks/local-storage'
import axios from 'axios'
import Hosts from '../../Config/Hosts'

const Home = props => {
  const [posts, setPosts] = useLocalStorage('posts')

  useEffect(() => {
    axios.get(Hosts.main + '/post')
      .then(res => {
        const mapped = res.data.data.map(item => {
          const date = new Date(item.updated_at)
          return {
            ...item,
            updated_at: date.toLocaleDateString(),
          }
        })
        if (res.data.status === 'success') setPosts(mapped)
        // if (res.data.status === 'error') console.log(res.data);
      })
  }, [setPosts])
  console.log(posts);

  return (
    <Main>
      <div id="container" className='grid grid-cols-2 gap-3 mx-5 mt-3'>
        {posts.length ? posts.map(post => (
          <div id="card" key={post.id}
            className='bg-white p-1 rounded shadow-md'
          >
            <div id="filler" className='aspect-video bg-neutral-500'></div>
            <div id="card-body" className='grid grid-cols-2 gap-1'>
              <h1 className='font-semibold col-span-2'>{post.title}</h1>
              <h5 className='text-xs self-end'>{post.name}</h5>
              <small className='text-end self-end'>{post.updated_at}</small>
            </div>
          </div>
        )) : null}
      </div>
    </Main>
  )
}

Home.propTypes = {
  auth: PropTypes.any
}

export default Home