import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
import Main from '../../../Layouts/Main'
import ButtonAnchor from '../../../Components/ButtonAnchor'
import axios from 'axios'
import Hosts from '../../../Config/Hosts'
import Auth from '../../../Config/Auth'
import { Link } from 'react-router-dom'

const Home = props => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get(Hosts.main + '/posts/all', {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            },
        })
            .then(res => setPosts(res.data.posts))
    }, [])
    console.log(posts)
    
    return (
        <Main>
            <div id="container" className='mx-5 my-6'>
                <ButtonAnchor to='/control/stall/create' className='bg-secondary w-full mb-3'>Create</ButtonAnchor>

                <div id="table-container" className='overflow-x-scroll'>
                    <table className='w-full table-auto'>
                        <thead className='bg-primary'>
                            <tr>
                                <th>Judul</th>
                                <th>Terakhir Diubah</th>
                                <th>Edit</th>
                                <th>Hapus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.length > 0 ?
                                (
                                    posts.map((post, i) => (
                                        <tr key={i}>
                                            <td>
                                                <Link to={`/post/${post.slug}`}>{post.title}</Link>
                                            </td>
                                            <td>{post.updated_at}</td>
                                            <td><ButtonAnchor className={'bg-yellow-300'} to={`/control/post/${post.id}/edit`}>Edit</ButtonAnchor></td>
                                            <td><ButtonAnchor className={'bg-red-600'} to={`/control/post/${post.id}`}>Hapus</ButtonAnchor></td>
                                        </tr>
                                    ))
                                ) : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Main>
    )
}

Home.propTypes = {}

export default Home