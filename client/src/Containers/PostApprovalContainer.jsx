import axios from "axios"
import { useEffect, useState } from "react"
import { FaCheck, FaEye } from "react-icons/fa"
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

    return (
        <>
            <div id="list" className="grid grid-cols-1 gap-1 mx-5 mt-3">
                {
                    [posts.length ? posts.map(post => {
                        return (
                            <div id="list-item" key={post.slug} className="bg-primary rounded p-3">
                                <h1 className="text-lg font-bold">{post.title}</h1>
                                <div id="control" className="flex justify-end gap-1">
                                    <ButtonAnchor className="bg-secondary px-5 py-2.5 rounded text-white" to={'' + post.slug}>
                                        <FaEye className="text-2xl" />
                                    </ButtonAnchor>
                                    <Button className="bg-secondary px-5 py-2.5 rounded text-white">
                                        <FaCheck className="text-2xl" />
                                    </Button>
                                </div>
                            </div>
                        )
                    }) : null]
                }
            </div>
        </>
    )
}

export default PostApprovalContainer