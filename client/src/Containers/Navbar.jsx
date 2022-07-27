import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Brand from '../Components/Brand'
import Button from '../Components/Button'
import { MdClose, MdMenu } from 'react-icons/md'
import anime from 'animejs'
import Logout from '../Components/Logout'

export default class Navbar extends Component {
  state = {
    sidebarDisplay: 'hidden',
    auth: Object
  }

  componentDidMount(){
    console.log(this.props.auth)
    this.setState({
      auth: this.props.auth
    })
  }

  handleSidebarToggle () {
    console.log()
    if(this.state.sidebarDisplay === 'hidden') {
      this.setState({
        sidebarDisplay: 'flex'
      })
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
        this.setState({
          sidebarDisplay: 'hidden'
        })
      }, 500);
    }
  }

  render() {
    return (
      <nav className='bg-primary h-14 flex items-center justify-between px-5'>
        <Button id='#sidebar' onClick={() => this.handleSidebarToggle()}>
          <MdMenu className='text-2xl' />
        </Button>
        <div id="sidebar" 
        className={`${this.state.sidebarDisplay} fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50`} 
        onClick={() => this.handleSidebarToggle()}
        >
          <div id="sidebarContainer" 
          className='fixed flex-col top-0 h-screen w-4/5 bg-base flex justify-start items-center' 
          onClick={e => e.stopPropagation()}
          style={{ transform: 'translateX(-100%)' }}
          >
            <div className="block w-full text-center bg-secondary">
              <Button onClick={() => this.handleSidebarToggle()}
              className='px-8 py-4 active:shadow-2xl'
              >
                <MdClose className='text-2xl' />
              </Button>
            </div>
            <div id="content" className='w-full'>
              <NavLink to={'/'} className='flex items-center justify-center h-11'>Home</NavLink>
              <NavLink to={'/stall'} className='flex items-center justify-center h-11'>Stall</NavLink>
              <NavLink to={'/post'} className='flex items-center justify-center h-11'>Posts</NavLink>
              {this.state.auth ? (
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
      </nav>
    )
  }
}