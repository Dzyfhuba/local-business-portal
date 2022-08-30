import { useLocalStorage } from '@rehooks/local-storage'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { IoMdCloseCircle } from 'react-icons/io'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import { ScrollToTop } from '../../Components/ScrollToTop'
import Hosts from '../../Config/Hosts'
import { supabase } from '../../Config/SupabaseClient'
import Var from '../../Config/Var'
import Image404 from '../../Images/404.jpg'
import Main from '../../Layouts/Main'

const Home = props => {
  const [posts, setPosts] = useLocalStorage('posts')
  const [filter, setFilter] = useState(Object)
  const [showClear, setShowClear] = useState(Boolean)

  useEffect(() => {
    axios.get(Hosts.main + '/post')
      .then(async res => {
        if (res.data.status === 'success') {
          res.data.data.forEach(async (item, i) => {
            const date = new Date(item.updated_at)
            res.data.data[i].updated_at = date.toLocaleDateString()
            if (!item.images) {
              res.data.data[i].images = null
              return
            }
            const imageName = item.images.split(',')[0]
            const { data, } = await supabase.storage.from('post-images').getPublicUrl(imageName)
            res.data.data[i].images = data.publicURL

          });
          setPosts(res.data.data)
        }
        // if (res.data.status === 'error') console.log(res.data);
      })
  }, [setPosts])
  console.log(posts);

  const searchPost = e => {
    e.preventDefault()
    const data = {
      filter: e.target.value
    }
    console.log(data);
    setFilter(data)

    setShowClear(data.filter ? true : false)
  }

  return (
    <Main>
      <Helmet>
        <title>{`Produk UMKM | ${Var.APP_NAME}`}</title>
        <meta name='description' content='Portal UMKM Desa Bululanjang Sangkapura Bawean adalah sebuah aplikasi website yang menampung sejumlah informasi-informasi tentang UMKM di desa Bululanjang untuk mempromosikannya ke internet dengan lebih luas dan membawa nama Bululanjang sebagai pusat bisnisnya.' />
      </Helmet>
      <div className="mx-5 my-3">
      <div className="input-group flex items-center bg-white outline outline-1 outline-slate-200 rounded h-11 relative">
            <Input placeholder='Search...' className='outline-none absolute h-inherit mb-0' id='filter' onKeyUp={searchPost} />
            <Button className={`aspect-square h-full block z-[1] ml-auto px-0 py-0${showClear ? null : ' hidden'}`}
              onClick={e => {
                e.preventDefault()
                setFilter('')
                document.getElementById('filter').value = ''
              }}
              >
              <IoMdCloseCircle className='text-2xl mx-auto text-neutral-300' />
            </Button>
          </div>
          <small className='text-xs opacity-50'>Isi dengan nama UMKM atau produknya</small>
      </div>
      <div id="container" className='grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 place-content-center gap-3 mx-5'>
        {posts ? posts
          .filter(post => {
            if (filter.filter) {
              return post.title.toLowerCase().includes(filter.filter.toLowerCase()) || post.name.toLowerCase().includes(filter.filter.toLowerCase())
            }
            return post
          })
          .map((post, i) => (
            <div id="card" key={post.id}
              className={`bg-white p-1 rounded shadow-md${!post.images ? ' order-last' : ''}`}
            >
              {/* <img src={images[i]} alt="" /> */}
              <Link to={`/post/${post.username}/${post.slug}`}>
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