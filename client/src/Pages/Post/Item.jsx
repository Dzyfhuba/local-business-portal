import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Hosts from '../../Config/Hosts'
import { supabase } from '../../Config/SupabaseClient'
import Main from '../../Layouts/Main'
import Image404 from '../../Images/404.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


// import PropTypes from 'prop-types'

const Item = props => {
    const { stall, slug } = useParams()
    const [post, setPost] = useState({})
    const [images, setImage] = useState([Image404])

    useEffect(() => {
        axios.get(`${Hosts.main}/post/${stall}/${slug}`)
            .then(res => {
                const date = new Date(res.data.data.updated_at)
                res.data.data.updated_at = date.toLocaleString()
                // console.log(date)
                console.log(typeof res.data.data.updated_at)
                setPost(res.data.data)
                getSupabaseImages(res.data.data.images)
            })
    }, [])

    const getSupabaseImages = async (images) => {
        images = images.slice(-1) === ';' ? images.slice(0, -1) : images
        const arrayOfImages = images.split(';')
        const supabaseImages = []

        await arrayOfImages.forEach(async image => {
            const { data, error } = await supabase.storage.from('post-images').getPublicUrl(image)

            if (error) {
                supabaseImages.push(Image404)
            }

            supabaseImages.push(data.publicURL)
        });
        setImage(supabaseImages)
        console.log(supabaseImages)
    }

    return (
        <Main>
            <Carousel showArrows={false}>
                {
                    images.map((image, i) => (
                        <Zoom>
                                <img src={image} alt={`${post.title} ${i}`} key={i} style={{maxHeight: 300  , objectFit: 'cover'}} />
                        </Zoom>
                    ))
                }
            </Carousel>
            <article className='mx-5 mt-3'>
                <h1 className='font-black text-3xl'>{post.title}</h1>
                <small>{post.updated_at}</small>
                {/* <h3>{post.name}</h3> */}
                <section id='description'>
                    <h2 className='font-bold text-lg'>Dekripsi Produk</h2>
                    <p>
                        {post.content}
                    </p>
                </section>
            </article>
        </Main>
    )
}

Item.propTypes = {}

export default Item