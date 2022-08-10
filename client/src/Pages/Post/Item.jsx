import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Hosts from '../../Config/Hosts'
import { supabase } from '../../Config/SupabaseClient'
import Main from '../../Layouts/Main'
import Image404 from '../../Images/404.jpg'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { CgProfile } from 'react-icons/cg'
import { LazyLoadImage } from 'react-lazy-load-image-component'

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
                setPost(res.data.data)
                getSupabaseImages(res.data.data.images)
            })
    }, [])

    const getSupabaseImages = async (images) => {
        images = images.slice(-1) === ';' ? images.slice(0, -1) : images
        const arrayOfImages = images.split(',')
        const supabaseImages = []

        await arrayOfImages.forEach(async image => {
            const { data, error } = await supabase.storage.from('post-images').getPublicUrl(image)

            if (error) {
                supabaseImages.push(Image404)
            }

            supabaseImages.push(data.publicURL)
        });
        console.log(supabaseImages);
        setImage(supabaseImages)
    }

    return (
        <Main>
            <Carousel 
            showArrows={false}
            renderThumbs={img => {
                const result = img.map((item, i) => {
                    return (
                        <img 
                        src={item.props.children.props.src}
                        alt={item.props.children.props.alt}
                        className='h-11 object-cover'
                        key={i}
                        />
                    )
                })
                return result
            }}
             >
                {
                    images.map((image, i) => (
                        <Zoom key={i}>
                            <LazyLoadImage
                                alt={`${post.title} ${i}`}
                                src={image} // use normal <img> attributes as props
                                placeholderSrc={Image404}
                                className={'h-80 w-full aspect-square'}
                            />
                            {/* <img src={image} alt={`${post.title} ${i}`} /> */}
                        </Zoom>
                    ))
                }
            </Carousel>
            <article className='mx-5 bg-white rounded p-5 shadow grid  '>
                <CgProfile className='text-3xl' />
                <Link to='/'>
                    <h1>{post.name}</h1>
                </Link>
            </article>
            <article className='mx-5 mt-3 bg-white rounded p-5 shadow'>
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