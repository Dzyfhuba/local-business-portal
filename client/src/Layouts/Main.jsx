import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../Containers/Navbar'
import axios from 'axios'
import Hosts from '../Config/Hosts'
import Auth from '../Config/Auth'
import Footer from '../Containers/Footer'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'

const Main = props => {
  const [, setAuth] = useState(Array)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(Hosts.main + '/auth/check', {
      headers: {
        'Authorization': `Bearer ${Auth.getToken()}`
      },
    })
      .then(res => {
        if (res.data.status === 'success') {
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
      }).catch(({ response }) => {
        if (response.data.data.remainingSuspension) {
          swal('Ditangguhkan', response.data.message, 'error')
            .then(() => {
              axios.post(Hosts.main + '/logout')
                .then(res => {
                  if (res.data.status === 'success') {
                    swal('Success', res.data.message, res.data.status)
                      .then(() => {
                        Auth.reset()
                        navigate(0)
                      })
                  }
                })
            })
        }
      })
  }, [navigate])

  return (
    <div className="bg-base min-h-screen">
      <Navbar auth={Auth.getUser()} />
      <main className='pt-3 pb-5'>{props.children}</main>
      <Footer />
    </div>
  )
}

Main.propTypes = {
  children: PropTypes.any
}

export default Main