import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../Containers/Navbar'
import axios from 'axios'
import Hosts from '../Config/Hosts'
import Auth from '../Config/Auth'
import Footer from '../Containers/Footer'
import { HeadProvider as Head, Title } from 'react-head'
import Var from '../Config/Var'

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
          axios.get(Hosts.main + '/profile', {
            headers: {
              'Authorization': `Bearer ${Auth.getToken()}`
            }
          })
            .then(res => {
              console.log(res.data.data.profile);
            })
        } else if (res.data.status === 'error') {
          localStorage.clear()
          Auth.setUser({
            role: 'guest'
          })
        }
      })
  }, [])

  return (
    <div className="bg-base min-h-screen">
      <Head>
        <Title>{Var.APP_NAME}</Title>
      </Head>
      <Navbar auth={Auth.getUser()} />
      <main>{props.children}</main>
      <Footer />
    </div>
  )
}

Main.propTypes = {
  children: PropTypes.any
}

export default Main