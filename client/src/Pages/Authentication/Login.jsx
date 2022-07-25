import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Brand from '../../Components/Brand'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import Label from '../../Components/Label'

export default class Login extends Component {
  render() {
    return (
      <div
      className='bg-base w-full h-full fixed flex justify-center items-center'
      >
        <div id="card" className='w-4/5 bg-primary p-3 rounded'>
            <div id="header">
                <Link to={'/'}>
                    <h1 className='text-center text-xl'>
                        <Brand>Bululanjang</Brand>
                    </h1>
                </Link>
                <h3 className='text-center'>Login</h3>
            </div>
            <form action="" className=''>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' placeholder='Email...' required/>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' type='password' placeholder='Password...' required/>
                <div className="text-right">
                    <Button level='secondary' type='submit'>Submit</Button>
                </div>
            </form>
            <div id="footer" className='mt-5 text-center text-black text-opacity-50 hover:text-secondary'>
                <Link to={'/register'}>Doesn't have any account? Register</Link>
            </div>
        </div>
      </div>
    )
  }
}
