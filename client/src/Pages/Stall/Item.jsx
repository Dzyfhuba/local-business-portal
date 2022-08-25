import { useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
import { FaWhatsapp } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import PhoneInput from 'react-phone-number-input'
import { useParams } from 'react-router-dom'
import Hosts from '../../Config/Hosts'
import { supabase } from '../../Config/SupabaseClient'
import Var from '../../Config/Var'
import Image404 from '../../Images/404.jpg'
import Main from '../../Layouts/Main'

const Item = props => {
    const { stall } = useParams()
    const [item, setItem] = useState({})

    useEffect(() => {
        axios.get(`${Hosts.main}/stall/${stall}`)
            .then(async res => {
                const { data, } = await supabase.storage.from('profile').getPublicUrl(res.data.data.stall.profile)
                res.data.data.stall.profile = data.publicURL

                setItem(res.data.data.stall)
            })
    }, [setItem, stall])

    return (
        <Main>
            <Helmet>
                <title>{`${item.name} | UMKM | ${Var.APP_NAME}`}</title>
                <meta name='description' content='Portal UMKM Desa Bululanjang Sangkapura Bawean adalah sebuah aplikasi website yang menampung sejumlah informasi-informasi tentang UMKM di desa Bululanjang untuk mempromosikannya ke internet dengan lebih luas dan membawa nama Bululanjang sebagai pusat bisnisnya.' />
            </Helmet>
            <div id="container" className='mx-5 mt-3'>
                <article>
                    <div className='text-center '>
                        <Zoom>
                            <LazyLoadImage
                                src={item.profile}
                                placeholder={<span>asdasd</span>}
                                placeholderSrc={Image404}
                                className={'h-80 object-contain text-center'}
                                // wrapperClassName={'aspect-square'}
                            />
                        </Zoom>
                    </div>
                    <div id="header" className='p-3 bg-white mb-3 shadow-md'>
                        <h1 id="title" className='text-3xl font-bold'>
                            {item.name}
                        </h1>
                        <small>
                            {item.address}
                        </small>
                        <div className="flex items-center justify-between h-14 border overflow-x-scroll sm:overflow-hidden">
                            <PhoneInput
                                defaultCountry={'ID'}
                                placeholder='Nomor Telepon...' value={item.phone}
                                className='focus-within:outline-secondary outline p-3 bg-white outline-none border-none'
                                onChange={() => console.log('')}
                                readOnly
                                disabled
                            />
                            <a className='aspect-square h-11 text-center bg-[#47C753] text-white rounded shadow-md p-3'
                                href={`https://api.whatsapp.com/send?phone=${item.phone ? item.phone.replace('+', '') : null}`}
                                rel="noopener noreferrer"
                                target={'_blank'}
                            >
                                <FaWhatsapp className='mx-auto text-lg' />
                            </a>
                        </div>
                    </div>
                    <div id="description" className='bg-white p-3 shadow-md'>
                        <h2 className='text-xl font-semibold'>
                            Deskripsi
                        </h2>
                        {item.description}
                    </div>
                </article>
                <section>
                </section>
            </div>
        </Main>
    )
}

Item.propTypes = {}

export default Item