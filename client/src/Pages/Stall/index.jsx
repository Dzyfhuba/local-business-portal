import React, { useEffect } from 'react'
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

const Home = props => {
  const [stalls, setStalls] = useLocalStorage('stalls')

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
            const { data,  } = await supabase.storage.from('profile').getPublicUrl(imageName)
            // imageMap.push(data.publicURL)
            res.data.data[i].profile = data.publicURL
          });
          setStalls(res.data.data)
        }
      })
  }, [setStalls])
  console.log(stalls);
  
  return (
    <Main>
      <div id="container" className='grid grid-cols-2 gap-3 mx-5 mt-3'>
        {stalls ? stalls.map((stall, i) => (
          <div id="card" key={stall.id}
            className={`bg-white p-1 rounded shadow-md${!stall.profile ? ' order-last': ''}`}
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