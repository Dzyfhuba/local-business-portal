import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Main from '../../Layouts/Main'
import { useLocalStorage } from '@rehooks/local-storage'
import axios from 'axios'
import Hosts from '../../Config/Hosts'
import { Link } from 'react-router-dom'
import { supabase } from '../../Config/SupabaseClient'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Image404 from '../../Images/404.jpg'
import { ScrollToTop } from '../../Components/ScrollToTop'

const Home = props => {
  const [posts, setPosts] = useLocalStorage('posts')

  useEffect(() => {
    axios.get(Hosts.main + '/post')
      .then(async res => {
        if (res.data.status === 'success') {
          res.data.data.forEach(async (item, i) => {
            if (!item.images) {
              res.data.data[i].images = null
              return
            }
            const imageName = item.images.split(';')[0]
            const { data,  } = await supabase.storage.from('post-images').getPublicUrl(imageName)
            res.data.data[i].images = data.publicURL

            const date = new Date(item.updated_at)
            res.data.data[i].updated_at = date.toLocaleDateString()
          });
          setPosts(res.data.data)
        }
        // if (res.data.status === 'error') console.log(res.data);
      })
  }, [setPosts])
  console.log(posts);
  return (
    <Main>
      <div id="container" className='grid grid-cols-2 gap-3 mx-5 mt-3'>
        {posts ? posts.map((post, i) => (
          <div id="card" key={post.id}
            className={`bg-white p-1 rounded shadow-md${!post.images ? ' order-last': ''}`}
          >
            {/* <img src={images[i]} alt="" /> */}
            <LazyLoadImage
            src={post.images}
            placeholder={<span>asdasd</span>}
            placeholderSrc={Image404}
            width='100%'
            className={'h-24 object-cover'}
            />
            <div id="card-body" className='grid grid-cols-2 gap-1'>
              <h1 className='font-semibold col-span-2'><Link to={`/post/${post.username}/${post.slug}`}>{post.title}</Link></h1>
              <h5 className='text-xs self-end'>{post.name}</h5>
              <small className='text-end self-end'>{post.updated_at}</small>
            </div>
          </div>
        )) : null}
      </div>
      <ScrollToTop />
    </Main>
  )
}

Home.propTypes = {
  auth: PropTypes.any
}

export default Home