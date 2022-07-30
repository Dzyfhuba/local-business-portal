import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Brand from '../Components/Brand'
import Button from '../Components/Button'
import { MdClose, MdMenu } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import anime from 'animejs'
import Logout from '../Components/Logout'
import Dropdown from 'rc-dropdown'
import Menu, { Divider, Item as MenuItem } from 'rc-menu'
import 'rc-dropdown/assets/index.css'


export default function Navbar(props) {
  const [sidebarDisplay, setSidebarDisplay] = useState('hidden')
  const [auth, setAuth] = useState({ role: 'guest' })
  const navigate = useNavigate()

  useEffect(() => {
    setAuth(props.auth)
    console.log(auth)
  }, [props.auth, auth])

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

  const menu = (
    <Menu>
      <MenuItem key={1} className='px-5 py-2.5 border-b hover:cursor-pointer text-center'>Profile</MenuItem>
      <Divider />
      <MenuItem key={2} className='px-5 py-2.5 capitalize hover:cursor-pointer text-center' onClick={() => navigate(`/control/${auth.role}`)}>
        {`${auth.role} Page`}
      </MenuItem>
      <MenuItem key={3} className='border-t'><Logout className={'px-5 py-2.5 w-full'} /></MenuItem>
    </Menu>
  )

  return (
    <nav className='bg-primary h-14 flex items-center justify-between px-5'>
      <Button id='#sidebar' onClick={handleSidebarToggle}>
        <MdMenu className='text-2xl' />
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
          <div className="block w-full text-center bg-secondary">
            <Button onClick={handleSidebarToggle}
              className='px-8 py-4 active:shadow-2xl'
            >
              <MdClose className='text-2xl' />
            </Button>
          </div>
          <div id="content" className='w-full'>
            <NavLink to={'/'} className='flex items-center justify-center h-11'>Home</NavLink>
            <NavLink to={'/stall'} className='flex items-center justify-center h-11'>Stall</NavLink>
            <NavLink to={'/post'} className='flex items-center justify-center h-11'>Posts</NavLink>
            {auth.role !== 'guest' ? (
              <NavLink to={`/control/${auth.role}`} className={'flex items-center justify-center w-full h-11 capitalize'}>{`${auth.role} Page`}</NavLink>
            ) : ''}
            {auth.role !== 'guest' ? (
              <Logout className={'flex items-center justify-center w-full h-11 bg-secondary'} />
            ) : (
              <NavLink to={'/login'} className='flex items-center justify-center h-11 bg-secondary'>Login</NavLink>
            )}
          </div>
        </div>
      </div>
      <Link to='/'>
        <Brand className='font-black text-xl'>BULULANJANG</Brand>
      </Link>
      {/* <button>
        <CgProfile />
      </button> */}
      {auth.role !== 'guest' ? (
        <Dropdown
          trigger={['click']}
          overlay={menu}
          animation="slide-up"
        >
          <button>
            <CgProfile className='text-2xl' />
          </button>
        </Dropdown>
      ) : ''}
    </nav>
  )
}