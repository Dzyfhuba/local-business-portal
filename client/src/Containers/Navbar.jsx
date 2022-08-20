import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Brand from '../Components/Brand'
import Button from '../Components/Button'
import { MdClose, MdMenu } from 'react-icons/md'
import anime from 'animejs'
import Logout from '../Components/Logout'
import Dropdown from 'rc-dropdown'
import Menu, { Divider, Item as MenuItem } from 'rc-menu'
import 'rc-dropdown/assets/index.css'
import axios from 'axios'
import Hosts from '../Config/Hosts'
import Auth from '../Config/Auth'
import { supabase } from '../Config/SupabaseClient'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { CgProfile } from 'react-icons/cg'

export default function Navbar(props) {
  const [sidebarDisplay, setSidebarDisplay] = useState('hidden')
  const [position, setPosition] = useState(Number)
  const navigate = useNavigate()
  const [image, setImage] = useState(String)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setPosition(window.scrollY)
    })
    axios.get(Hosts.main + '/profile', {
      headers: {
        'Authorization': `Bearer ${Auth.getToken()}`
      },
    })
      .then(async res => {
        if (res.data.status === 'success') {
          console.log(res.data);
          if (res.data.data.profile) {
            const { data, error } = await supabase.storage.from('profile').getPublicUrl(res.data.data.profile)
            console.log(data, error)
            setImage(data.publicURL)
          } else {
            setImage(null)
            return
          }
        }
      })
  }, [])

  const handleSidebarToggle = () => {
    if (sidebarDisplay === 'hidden') {
      setSidebarDisplay('flex')
      anime({
        targets: '#sidebarContainer',
        translateX: '0',
        easing: 'easeOutExpo',
        duration: 500
      })
    } else {
      anime({
        targets: '#sidebarContainer',
        translateX: '-100%',
        easing: 'easeOutExpo',
        duration: 500
      })
      setTimeout(() => {
        setSidebarDisplay('hidden')
      }, 500);
    }
  }
  // console.log(props.auth);
  const menu = props.auth ? (
    <Menu>
      <MenuItem key={1} className='px-5 py-2.5 border-b hover:cursor-pointer text-center' onClick={() => navigate(`/control/${Auth.getRole()}/profile`)}>Profile</MenuItem>
      <Divider />
      <MenuItem key={2} className='px-5 py-2.5 capitalize hover:cursor-pointer text-center' onClick={() => navigate(`/control/${Auth.getRole()}`)}>
        {`${Auth.getRole()} Page`}
      </MenuItem>
      <MenuItem key={3} className='border-t'><Logout className={'px-5 py-2.5 w-full'} /></MenuItem>
    </Menu>
  ) : null

  return (
    <nav className={`bg-primary h-14 flex items-center justify-between px-1 fixed w-full z-50 shadow-md${position >= 10 ? ' bg-opacity-50' : ''}`} style={{ top: 0 }}>
      <Button id='#sidebar' onClick={handleSidebarToggle}>
        <MdMenu className='text-2xl ' />
      </Button>
      <div id="sidebar"
        className={`${sidebarDisplay} fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-50`}
        onClick={handleSidebarToggle}
      >
        <div id="sidebarContainer"
          className='fixed flex-col top-0 h-screen w-4/5 bg-base flex justify-start items-center'
          onClick={e => e.stopPropagation()}
          style={{ transform: 'translateX(-100%)' }}
        >
          <div className="block w-full text-center bg-secondary ">
            <Button onClick={handleSidebarToggle}
              className='px-8 py-4 active:shadow-2xl'
            >
              <MdClose className='text-2xl' />
            </Button>
          </div>
          <div id="content" className='w-full'>
            <NavLink to={'/'} className='flex items-center justify-center h-11 uppercase'>Home</NavLink>
            <NavLink to={'/stall'} className='flex items-center justify-center h-11 uppercase'>UMKM</NavLink>
            <NavLink to={'/post'} className='flex items-center justify-center h-11 uppercase'>Produk</NavLink>
            {Auth.getRole() !== 'guest' ? (
              <NavLink to={`/control/${Auth.getRole()}`} className={'flex items-center justify-center w-full h-11 uppercase'}>{`${Auth.getRole()} Page`}</NavLink>
            ) : ''}
            {Auth.getRole() !== 'guest' ? (
              <Logout className={'flex items-center justify-center w-full h-11 bg-secondary text-white uppercase'} />
            ) : (
              <>
                <NavLink to={'/login'} className='flex items-center justify-center h-11 bg-secondary text-white uppercase'>Login</NavLink>
                <hr />
                <NavLink to={'/register'} className='flex items-center justify-center h-11 bg-secondary text-white uppercase'>Register</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
      <Link to='/' className=''>
        <Brand className='font-black text-xl'>BULULANJANG</Brand>
      </Link>
      {/* <button>
        <CgProfile />
      </button> */}
      {Auth.getRole() !== 'guest' ? (
        <Dropdown
          trigger={['click']}
          overlay={menu}
          animation="slide-up"
        >
          <button className='aspect-square w-11 h-11'>
            {
              image ? (
                <LazyLoadImage
                  src={image}
                  className={'w-full aspect-square object-cover shadow-md rounded-full'}
                  alt={'profile'}
                />
              ) : (
                <CgProfile className='text-3xl ' />
              )
            }
          </button>
        </Dropdown>
      ) : ''}
    </nav>
  )
}