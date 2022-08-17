import React, { useEffect, useState } from 'react'
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
import Input from '../../Components/Input'
import { MdSearch } from 'react-icons/md'
import Button from '../../Components/Button'

const Home = props => {
  const [posts, setPosts] = useLocalStorage('posts')
  const [filter, setFilter] = useState(Object)

  useEffect(() => {
    axios.get(Hosts.main + '/post')
      .then(async res => {
        if (res.data.status === 'success') {
          res.data.data.forEach(async (item, i) => {
            if (!item.images) {
              res.data.data[i].images = null
              return
            }
            const imageName = item.images.split(',')[0]
            const { data, } = await supabase.storage.from('post-images').getPublicUrl(imageName)
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

  const searchPost = e => {
    e.preventDefault()
    const formElement = e.target

    const data = {
      title: formElement.querySelector('#title').value
    }
    setFilter(data)
  }

  return (
    <Main>
      <div className="mx-5 my-3">
        <form
          onSubmit={searchPost}
        >
          <div className="input-group flex items-center bg-white outline outline-1 outline-slate-200 rounded h-11">
            <Input placeholder='Search...' className='outline-none p-3 w-full' id='title' />
            <Button className='aspect-square h-full block'>
              <MdSearch className='text-4xl mx-auto text-neutral-300' />
            </Button>
          </div>
          <small className='text-xs opacity-50'>Isi dengan nama UMKM atau produk</small>
        </form>
      </div>
      <div id="container" className='grid grid-cols-2 gap-1 mx-5'>
        {posts ? posts
          .filter(post => {
            if (filter.title) return post.title.toLowerCase().includes(filter.title.toLowerCase()) || post.name.toLowerCase().includes(filter.title.toLowerCase())
            return post
          })
          .map((post, i) => (
            <div id="card" key={post.id}
              className={`bg-white p-1 rounded shadow-md${!post.images ? ' order-last' : ''}`}
            >
              {/* <img src={images[i]} alt="" /> */}
              <Link to={`/post/${post.slug}`}>
                <LazyLoadImage
                  src={post.images}
                  placeholder={<span>asdasd</span>}
                  placeholderSrc={Image404}
                  width='100%'
                  className={'h-24 object-cover'}
                />
              </Link>
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