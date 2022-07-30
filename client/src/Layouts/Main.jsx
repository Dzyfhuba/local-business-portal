import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../Containers/Navbar'
import axios from 'axios'
import Hosts from '../Config/Hosts'
import Auth from '../Config/Auth'

const Main = props => {
  const [, setAuth] = useState(Array)

  useEffect(() => {
    axios.get(Hosts.main + '/auth/check', {
      headers: {
        'Authorization': `Bearer ${Auth.getToken()}`
      },
    })
      .then(res => {
        if(res.data.status === 'success') {
          Auth.setUser(res.data.user)
          setAuth(res.data.user)
        } else if (res.data.status === 'error') {
          localStorage.clear()
          Auth.setUser({
            role: 'guest'
          })
        }
        console.log(res.data)
      })
  }, [])

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