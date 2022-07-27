import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../Containers/Navbar'
import axios from 'axios'
import Hosts from '../Config/Hosts'
import { useCookies } from 'react-cookie'

const Main = props => {
  const [cookies, setCookies] = useCookies(['token'])

  useEffect(() => {
    axios.get(Hosts.main + '/auth/check', {
      headers: {
        'Authorization': `Bearer ${cookies.token}`
      },
    })
      .then(res => console.log(res.data))
  }, )

  return (
    <div className="bg-base min-h-screen">
      <Navbar auth={JSON.parse(localStorage.getItem('auth'))} />
      {props.children}
    </div>
  )
}

Main.propTypes = {
  children: PropTypes.any
}

export default Main