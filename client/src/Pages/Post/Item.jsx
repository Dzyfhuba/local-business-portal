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
import { FaWhatsapp } from 'react-icons/fa'
import { Helmet } from 'react-helmet-async'
import Var from '../../Config/Var'

// import PropTypes from 'prop-types'

const Item = props => {
    const { stall, slug } = useParams()
    const [post, setPost] = useState({})
    const [images, setImage] = useState([Image404])
    const [profileImage, setProfileImage] = useState(String)

    useEffect(() => {
        axios.get(`${Hosts.main}/post/${stall}/${slug}`)
            .then(async res => {
                // console.log(res.data);
                const date = new Date(res.data.data.updated_at)
                res.data.data.updated_at = date.toLocaleString()
                // console.log(date)
                setPost(res.data.data)
                getSupabaseImages(res.data.data.images)

                console.log(res.data.data);
                if (res.data.data.profile) {
                    const { data, error } = await supabase.storage.from('profile').getPublicUrl(res.data.data.profile)
                    if (error) return
                    setProfileImage(data.publicURL)
                }
            })
            
    }, [slug, stall])

    const getSupabaseImages = async (images) => {
        images = images.slice(-1) === ';' ? images.slice(0, -1) : images
        const arrayOfImages = images.split(',')
        const supabaseImages = []

        if (!images) {
            supabaseImages.push(Image404)
        } else {
            await arrayOfImages.forEach(async image => {
                const { data, error } = await supabase.storage.from('post-images').getPublicUrl(image)

                if (error) {
                    supabaseImages.push(Image404)
                }

                supabaseImages.push(data.publicURL)
            });
        }
        setImage(supabaseImages)
    }

    console.log(profileImage);

    return (
        <Main>
            <Helmet>
                <title>{`${post.title} | ${post.name} | Produk UMKM | ${Var.APP_NAME}`}</title>
                <meta name='description' content='Portal UMKM Desa Bululanjang Sangkapura Bawean adalah sebuah aplikasi website yang menampung sejumlah informasi-informasi tentang UMKM di desa Bululanjang untuk mempromosikannya ke internet dengan lebih luas dan membawa nama Bululanjang sebagai pusat bisnisnya.' />
            </Helmet>
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
                                className={'w-full h-80 object-cover'}
                                wrapperClassName={''}
                            />
                            {/* <img src={image} alt={`${post.title} ${i}`} /> */}
                        </Zoom>
                    ))
                }
            </Carousel>
            <article className='mx-5 bg-white rounded p-5 flex justify-between items-center gap-1 overflow-x-scroll sm:overflow-hidden'>
                <div className='flex items-center gap-2'>
                    {
                        profileImage ? (
                            <img
                                alt={`${post.username}`}
                                src={profileImage}
                                className={'h-11 aspect-square object-cover rounded-full'}
                            />
                        ) : (
                            <CgProfile className='text-3xl' />
                        )
                    }
                    <Link to={`/stall/${post.username}`}>
                        <h1 className='font-bold text-xl whitespace-nowrap'>{post.name}</h1>
                    </Link>
                </div>
                <a className='aspect-square h-11 text-center bg-[#47C753] text-white rounded shadow-md p-3'
                    href={`https://api.whatsapp.com/send?phone=${post.phone ? post.phone.replace('+', '') : null}`}
                    rel="noopener noreferrer"
                    target={'_blank'}
                >
                    <FaWhatsapp className='mx-auto text-lg' />
                </a>
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