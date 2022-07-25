import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Brand from '../Components/Brand'
import {MdMenu} from 'react-icons/md'
import Button from '../Components/Button'

type Props = {}

type State = {}

export default class Navbar extends Component<Props, State> {
  state = {}

  render() {
    return (
      <nav className='bg-primary h-14 flex items-center justify-between px-5'>
        <Button>
          <MdMenu className='text-2xl' />
        </Button>
        <Link to='/'>
            <Brand className='font-black text-xl'>BULULANJANG</Brand>
        </Link>
      </nav>
    )
  }
}