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
import { RequiredStar } from '../../Components/RequiredStar'
import Navbar from '../../Containers/Navbar'

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
        console.log(res.data);
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
      <Navbar />
      <div id="card" className='w-4/5 bg-primary p-3 rounded max-w-[500px]'>
        <div id="header">
          <Link to={'/'}>
            <h1 className='text-center text-xl hover:text-white transition duration-300'>
              <Brand>Bululanjang</Brand>
            </h1>
          </Link>
          <h3 className='text-center'>Login</h3>
        </div>
        <form className='' onSubmit={handleForm}>
          <Label htmlFor='email'>Email<RequiredStar /></Label>
          <Input id='email' name='email' placeholder='Email...' autoFocus required />
          <Label htmlFor='password'>Password<RequiredStar /></Label>
          <Input id='password' name='password' type='password' placeholder='Password...' autoComplete='true' required />
          <div className="text-right">
            <Button
              className='text-white bg-secondary px-5 py-2.5 rounded hover:bg-white hover:text-blue-500 border border-blue-500 transition duration-300'
              type='submit'>
              Login
            </Button>
          </div>
        </form>
        <div id="footer" className='mt-5 text-center  text-opacity-70 hover:text-blue-500 underline'>
          <Link to={'/register'}>Doesn't have any account? Register</Link>
        </div>
      </div>
    </div>
  )
}
