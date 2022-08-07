import React from 'react'
import { NavLink } from 'react-router-dom'
import Var from '../Config/Var'

const Footer = () => {
  return (
    <footer className='bg-secondary text-white p-3 shadow-md'>
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
                    <iframe id={'location'} title={'locations'} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31753.69895248433!2d112.61719395523292!3d-5.825651435807087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2ddf5610e03dacf3%3A0x42aa83c24e5c6a86!2sBululanjang%2C%20Kec.%20Sangkapura%2C%20Kabupaten%20Gresik%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1659861248919!5m2!1sid!2sid" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"

                    style={{ width: '100%' }}
                    ></iframe>
                </div>
            </section>
        </article>
    </footer>
  )
}

export default Footer