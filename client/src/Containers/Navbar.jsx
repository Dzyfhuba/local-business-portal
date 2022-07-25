import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Brand from '../Components/Brand'
import Button from '../Components/Button'
import { MdClose, MdMenu } from 'react-icons/md'
import anime from 'animejs'

export default class Navbar extends Component {
  state = {
    sidebarDisplay: 'hidden'
  }

  componentDidMount(){
    console.log(this.state.sidebarDisplay)
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
          className='fixed top-0 h-screen w-4/5 bg-base flex justify-center items-start' 
          onClick={e => e.stopPropagation()}
          style={{ transform: 'translateX(-100%)' }}
          >
            <Button onClick={() => this.handleSidebarToggle()}>
              <MdClose className='text-2xl' />
            </Button>
          </div>
        </div>
        <Link to='/'>
            <Brand className='font-black text-xl'>BULULANJANG</Brand>
        </Link>
      </nav>
    )
  }
}