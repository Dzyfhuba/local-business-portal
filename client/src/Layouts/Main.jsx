import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../Containers/Navbar'
import axios from 'axios'
import Hosts from '../Config/Hosts'
import { useCookies } from 'react-cookie'
import Auth from '../Config/Auth'

const Main = props => {
  const [cookies, ] = useCookies(['token'])
  const [auth, setAuth] = useState([])

  useEffect(() => {
    axios.get(Hosts.main + '/auth/check', {
      headers: {
        'Authorization': `Bearer ${cookies.token}`
      },
    })
      .then(res => {
        if(res.data.status === 'success') {
          Auth.setUser(res.data.user)
          setAuth(res.data.user)
        }
      })
  }, [cookies.token, auth])

  return (
    <div className="bg-base min-h-screen">
      <Navbar auth={Auth.getUser()} />
      {props.children}
    </div>
  )
}

Main.propTypes = {
  children: PropTypes.any
}

export default Main