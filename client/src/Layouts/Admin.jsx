import axios from 'axios'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FaUsersCog } from 'react-icons/fa'
import { TbListCheck } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'
import Auth from '../Config/Auth'
import Hosts from '../Config/Hosts'
import Var from '../Config/Var'
import Navbar from '../Containers/Navbar'

const Admin = props => {
    const [, setAuth] = useState(Array)

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
            })
    }, [])

    return (
        <div className="bg-base min-h-screen">
            <Helmet>
                <title>{`Admin | ${Var.APP_NAME}`}</title>
                <meta name='description' content='Portal UMKM Desa Bululanjang Sangkapura Bawean adalah sebuah aplikasi website yang menampung sejumlah informasi-informasi tentang UMKM di desa Bululanjang untuk mempromosikannya ke internet dengan lebih luas dan membawa nama Bululanjang sebagai pusat bisnisnya.' />
            </Helmet>
            <Navbar auth={Auth.getUser()} />
            <nav className='fixed bottom-0 h-14 bg-secondary text-white w-full flex z-10'>
                <NavLink
                    to={'/control/admin/post-approval'}
                    className={`w-full h-full flex justify-center items-center hover:text-black transition duration-300`}
                >
                    <TbListCheck className='text-2xl' />
                </NavLink>
                {/* <NavLink
                    to={'/control/admin'}
                    className={`w-full h-full flex justify-center items-center hover:text-black transition duration-300`}
                >
                    <FaHome className='text-2xl' />
                </NavLink> */}
                <NavLink
                    to={'/control/admin/user-management'}
                    className={`w-full h-full flex justify-center items-center hover:text-black transition duration-300`}
                >
                    <FaUsersCog className='text-2xl' />
                </NavLink>
            </nav>
            <main className='pt-14 pb-5'>{props.children}</main>
        </div>
    )
}

Admin.propTypes = {
    children: PropTypes.any
}

export default Admin