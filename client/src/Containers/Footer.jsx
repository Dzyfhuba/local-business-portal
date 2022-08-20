import React from 'react'
import { NavLink } from 'react-router-dom'
import Var from '../Config/Var'

const Footer = () => {
    return (
        <footer className='bg-secondary  p-3 shadow-md'>
            <article>
                <h1 className='font-bold text-center text-xl mb-3'>
                    {Var.APP_NAME}
                </h1>
                <section className='grid grid-cols-2 gap-3'>
                    <div className='flex flex-col justify-around'>
                        <NavLink className={'hover:text-blue-500 underline'}
                            to={'/'}>Beranda</NavLink>
                        <NavLink className={'hover:text-blue-500 underline'}
                            to={'/stall'}>Daftar UMKM</NavLink>
                        <NavLink className={'hover:text-blue-500 underline'}
                            to={'/post'}>Daftar Produk</NavLink>
                        <NavLink className={'hover:text-blue-500 underline'}
                            to={'/contact'}>Kontak Kami</NavLink>
                    </div>
                    <div>
                        <a 
                        href="https://www.google.com/maps/place/Bululanjang,+Kec.+Sangkapura,+Kabupaten+Gresik,+Jawa+Timur/@-5.8256514,112.617194,14z/data=!3m1!4b1!4m5!3m4!1s0x2ddf5610e03dacf3:0x42aa83c24e5c6a86!8m2!3d-5.8219198!4d112.6347636"
                        className='underline'
                        >
                            Bululanjang, Gresik, Jawa Timur
                        </a>
                    </div>
                </section>
            </article>
        </footer>
    )
}

export default Footer