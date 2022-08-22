import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Main from '../../../Layouts/Main'
import ButtonAnchor from '../../../Components/ButtonAnchor'
import axios from 'axios'
import Hosts from '../../../Config/Hosts'
import Auth from '../../../Config/Auth'
import { Link } from 'react-router-dom'
import Button from '../../../Components/Button'
import swal from 'sweetalert'

const Home = props => {
    const [posts, setPosts] = useState([])
    // const [auth, setAuth] = useState(props.auth)

    useEffect(() => {
        axios.get(Hosts.main + '/post/all-by-stall', {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            },
        })
            .then(async res => {
                const mapped = await res.data.data.map(item => {
                    const date = new Date(item.updated_at)
                    return {
                        ...item,
                        updated_at: date.toLocaleString(),
                    }
                })
                setPosts(mapped)
            })
    }, [])

    const handleDelete = async (target, id) => {
        swal({
            title: "Yakin ingin dihapus?",
            text: "Setelah dihapus, Anda tidak akan dapat memulihkan post ini!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(Hosts.main + '/control/post/' + id)
                        .then(res => {
                            if (res.data.status === 'success') {
                                swal('Success', 'Berhasil dihapus', 'success')
                                    .then(() => {
                                        // console.log(target);
                                        target.closest('tr').remove()
                                    })
                            } else if (res.data.status === 'error') {
                                swal('Error', 'Gagal dihapus', 'error')
                            } else {
                                swal('Warning', res.data.message, res.data.status)
                            }
                            console.log(res.data);
                        })
                } else {
                    swal("Penghapusan dibatalkan");
                }
            });
    }

    return (
        <Main>
            <div id="container" className='mx-5 my-6'>
                <ButtonAnchor to='/control/stall/create' className={'bg-secondary text-white mb-3'}>Create</ButtonAnchor>

                <div id="table-container" className='overflow-x-scroll'>
                    <table className='w-full table-auto'>
                        <thead className='bg-primary '>
                            <tr className='h-11'>
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
                                                <td className='table-cell border p-3'>
                                                    <Link to={`/post/${post.username}/${post.slug}`}
                                                        className='text-blue-700 underline whitespace-nowrap'
                                                    >{post.title}</Link>
                                                </td>
                                                <td className='whitespace-nowrap table-cell border p-3'>{post.updated_at}</td>
                                                <td className='p-1 table-cell border'><ButtonAnchor className={'bg-yellow-300 table-cell border text-black'} to={`/control/stall/${post.id}/edit`}>Edit</ButtonAnchor></td>
                                                <td className='p-1 table-cell border'><Button className={'bg-red-600 table-cell border text-white'}
                                                    onClick={e => handleDelete(e.target, post.id)}
                                                >Hapus</Button></td>
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

Home.propTypes = {
    auth: PropTypes.object
}

export default Home