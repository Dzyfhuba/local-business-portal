import axios from 'axios'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { CgProfile } from 'react-icons/cg'
import { FaWhatsapp } from 'react-icons/fa'
import 'react-medium-image-zoom/dist/styles.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Link, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react"
import Hosts from '../../Config/Hosts'
import { supabase } from '../../Config/SupabaseClient'
import Var from '../../Config/Var'
import Image404 from '../../Images/404.jpg'
import Main from '../../Layouts/Main'
// Import Swiper React components
import MarkdownPreview from '@uiw/react-markdown-preview'

// Import Swiper styles
import "swiper/css"
import "swiper/css/lazy"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/zoom"

// import required modules
import { Mousewheel, Navigation, Pagination, Zoom } from "swiper"

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

    console.log(images);

    return (
        <Main>
            <Helmet>
                <title>{`${post.title} | ${post.name} | Produk UMKM | ${Var.APP_NAME}`}</title>
                <meta name='description' content='Portal UMKM Desa Bululanjang Sangkapura Bawean adalah sebuah aplikasi website yang menampung sejumlah informasi-informasi tentang UMKM di desa Bululanjang untuk mempromosikannya ke internet dengan lebih luas dan membawa nama Bululanjang sebagai pusat bisnisnya.' />
            </Helmet>
            <Swiper
                zoom={true}
                navigation={true}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                direction={'horizontal'}
                mousewheel={(true, {forceToAxis:true})}
                modules={[Zoom, Navigation, Pagination, Mousewheel]}
                className={'h-80'}
            >
                {
                    images.map((image, i) => (
                        <SwiperSlide className='flex items-center' key={i}>
                            <div className="swiper-zoom-container">
                                <img
                                    src={image}
                                    className="object-contain object-center w-full"
                                    alt={post.title}
                                />
                            </div>
                        </SwiperSlide>
                    ))

                }

            </Swiper>
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
                <section id='content'>
                    <h2 className='font-bold text-lg'>Dekripsi Produk</h2>
                    <MarkdownPreview source={post.content} />
                </section>
            </article>
        </Main>
    )
}

Item.propTypes = {}

export default Item