import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Main from '../../Layouts/Main'
import { useLocalStorage } from '@rehooks/local-storage'
import axios from 'axios'
import Hosts from '../../Config/Hosts'
import { Link } from 'react-router-dom'
import { supabase } from '../../Config/SupabaseClient'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import image404 from '../../Images/404.jpg'
import { ScrollToTop } from '../../Components/ScrollToTop'

const Home = props => {
  const [posts, setPosts] = useLocalStorage('posts')
  const [images, setImages] = useState([])

  useEffect(() => {
    axios.get(Hosts.main + '/post')
      .then(async res => {
        if (res.data.status === 'success') {
          const mapped = res.data.data.map(item => {
            const date = new Date(item.updated_at)
            return {
              ...item,
              updated_at: date.toLocaleDateString(),
            }
          })
          const imageMap = []
          res.data.data.forEach(async item => {
            const imageName = item.images.split(';')[0]
            const { data, error } = await supabase.storage.from('post-images').getPublicUrl(imageName)
            imageMap.push(data.publicURL)
          });
          setImages(imageMap)
          setPosts(mapped)
        }
        // if (res.data.status === 'error') console.log(res.data);
      })
  }, [setPosts])

  return (
    <Main>
      <div id="container" className='grid grid-cols-2 gap-3 mx-5 mt-3'>
        {posts.length ? posts.map((post, i) => (
          <div id="card" key={post.id}
            className='bg-white p-1 rounded shadow-md'
          >
            {/* <img src={images[i]} alt="" /> */}
            <LazyLoadImage
            src={images[i]}
            placeholder={<span>asdasd</span>}
            placeholderSrc={image404}
            width='100%'
            className={'h-24'}
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