import React from 'react'
import { Link } from 'react-router-dom'
import Brand from '../../Components/Brand'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import Label from '../../Components/Label'
import axios from 'axios'
import Hosts from '../../Config/Hosts'
import swal from 'sweetalert';
import Auth from '../../Config/Auth'

export default function Login() {

  const handleForm = (e) => {
    e.preventDefault()
    const data = {
      email: e.target.querySelector('#email').value,
      password: e.target.querySelector('#password').value,
    }
    axios.post(Hosts.main + '/login', data, {
      headers: {
        'Authorization': `Bearer ${Auth.getToken()}`
      },
    })
      .then(res => {
        if (res.data.status === 'success') {
          console.log(res.data.token.token)
          // setCookies('token', res.data.token.token)
          Auth.setToken(res.data.token.token)
          swal('Success', 'Login has been successfully', 'success')
            .then(() => {
              Auth.setUser(res.data.user)
              window.location.href = '/'
            })
        } else if (res.data.status === 'warning') {
          swal('Warning', res.data.message, 'warning')
            .then(() => {
              window.location.href = '/'
            })
        } else if (res.data.error) {
          swal('Error', res.data.message, res.data.status)
        }
      })
  }

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
        <form className='' onSubmit={handleForm}>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' name='email' placeholder='Email...' autoFocus required />
          <Label htmlFor='password'>Password</Label>
          <Input id='password' name='password' type='password' placeholder='Password...' autoComplete='true' required />
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
