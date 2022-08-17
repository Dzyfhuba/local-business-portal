import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Main from '../../Layouts/Main'
import useLocalStorage from '@rehooks/local-storage'
import axios from 'axios'
import Hosts from '../../Config/Hosts'
import { supabase } from '../../Config/SupabaseClient'
import Image404 from '../../Images/404.jpg'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { ScrollToTop } from '../../Components/ScrollToTop'
import { Link } from 'react-router-dom'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { MdSearch } from 'react-icons/md'

const Home = props => {
  const [stalls, setStalls] = useLocalStorage('stalls')
  const [filter, setFilter] = useState(Object)

  useEffect(() => {
    axios.get(Hosts.main + '/stall')
      .then(res => {
        console.log(res.data.data);
        if (res.data.status === 'success') {
          res.data.data.forEach(async (item, i) => {
            if (!item.profile) {
              res.data.data[i].profile = null
              return
            }
            const imageName = item.profile.split(';')[0]
            const { data, } = await supabase.storage.from('profile').getPublicUrl(imageName)
            // imageMap.push(data.publicURL)
            res.data.data[i].profile = data.publicURL
          });
          setStalls(res.data.data)
        }
      })
  }, [setStalls])
  console.log(stalls);

  const searchPost = e => {
    e.preventDefault()
    const formElement = e.target

    const data = {
      username: formElement.querySelector('#username').value
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
            <Input placeholder='Search...' className='outline-none p-3 w-full' id='username' />
            <Button className='aspect-square h-full block'>
              <MdSearch className='text-4xl mx-auto text-neutral-300' />
            </Button>
          </div>
          <small className='text-xs opacity-50'>Isi dengan nama UMKM atau produk</small>
        </form>
      </div>
      <div id="container" className='grid grid-cols-2 gap-1 mx-5'>
        {stalls ? stalls
          .filter(post => {
            if (filter.username) return post.username.toLowerCase().includes(filter.username.toLowerCase()) || post.address.toLowerCase().includes(filter.username.toLowerCase())
            return post
          })
          .map((stall, i) => (
            <div id="card" key={stall.id}
              className={`bg-white p-1 rounded shadow-md${!stall.profile ? ' order-last' : ''}`}
            >
              <Link to={`/stall/${stall.username}`}>
                <LazyLoadImage
                  src={stall.profile}
                  placeholder={<span>asdasd</span>}
                  placeholderSrc={Image404}
                  width='100%'
                  className={'h-24 object-cover'}
                />
              </Link>
              <div id="card-body" className='grid grid-cols-1 gap-1'>
                <h1 className='font-semibold'><Link to={`/stall/${stall.username}`}>{stall.name}</Link></h1>
                <h5 className='text-xs self-end'>{stall.address}</h5>
                <small className='text-end self-end'>{stall.updated_at}</small>
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