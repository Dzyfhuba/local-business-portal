import axios from "axios"
import { useEffect, useState } from "react"
import { FaCheck, FaEye } from "react-icons/fa"
import swal from "sweetalert"
import Button from "../Components/Button"
import ButtonAnchor from "../Components/ButtonAnchor"
import Hosts from "../Config/Hosts"

const PostApprovalContainer = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get(Hosts.main + '/control/post-approval')
            .then(res => {
                if (res.data.status === 'success') {
                    setPosts(res.data.data)
                }
            })
    }, [])

    console.log(posts)
    const approve = (e, post_id) => {
        swal('Setujui artikel ini?', {
            content: {
                element: 'checkbox',
            },
            buttons: {
                cancel: 'Batal',
                agree: {
                    text: 'Setuju',
                    className: 'bg-green-500 text-black'
                },
            }
        }).then(val => {
            if (val === 'agree') {
                axios.put(Hosts.main + '/control/post-approval', {
                    id: post_id
                }).then(res => {
                    if (res.data.status === 'success') {
                        // e.target.closest('#list-item').remove()
                        const remainingPost = posts.filter(post => post.id !== post_id)
                        setPosts(remainingPost)
                        swal('Success', 'Telah disetujui', 'success')
                    } else {
                        swal('Gagal', res.data.message || res.data.data, res.data.status)
                    }
                })
            }
        })
    }

    const emptyState = (
        <div className="h-80 flex justify-center items-center text-5xl select-none p-5">
            <p className='text-center font-mono font-extrabold tracking-widest opacity-50'>
                Tidak Ada Postingan Yang Sedang Membutuhkan Persetujuan
            </p>
        </div>
    )

    return (
        <>
            <div id="list" className="grid grid-cols-1 gap-1 mx-5 mt-3">
                {
                    posts.length ? posts.map(post => {
                        return (
                            <div id="list-item" key={post.slug} className="bg-primary rounded p-3">
                                <h1 className="text-lg font-bold">{post.title}</h1>
                                <h3>{post.username}</h3>
                                <div id="control" className="flex justify-end gap-1">
                                    <ButtonAnchor className="bg-secondary px-5 py-2.5 rounded text-white" to={`/post/${post.username}/${post.slug}`} target='_blank' rel='noopener'>
                                        <FaEye className="text-2xl" />
                                    </ButtonAnchor>
                                    <Button className="bg-secondary px-5 py-2.5 rounded text-white" onClick={(e) => approve(e, post.id)}>
                                        <FaCheck className="text-2xl" />
                                    </Button>
                                </div>
                            </div>
                        )
                    }) : emptyState
                }
            </div>
        </>
    )
}

export default PostApprovalContainer