import React from 'react'

const Welcome = () => {
  return (
    <section className={`min-h-screen bg-fixed`} style={{ backgroundImage: "url('/bululanjang-mountain.jpg')", backgroundSize: 'cover', backgroundPosition: 'top' }}>
        <article className='absolute min-h-screen top-0 flex flex-col justify-between px-5 text-center w-full text-white pt-16 pb-3'>
            <h1 className='text-transparent'>
              Portal UMKM Desa Bululanjang, Sangkapura, Pulau Bawean, Gresik, Jawa Timur
            </h1>
            <div id="title-wrap" className=' p-3'>
              <h1 className='text-3xl font-bold'>Portal UMKM</h1>
              <h1 className='text-3xl font-bold uppercase'>Desa Bululanjang</h1>
              <h2 className='text-lg'>Sangkapura, Pulau Bawean</h2>
              <h2 className='text-xl'>Gresik, Jawa Timur</h2>
            </div>
            <div id="footer-wrap" className=''>
              <h3>Oleh Mahasiswa KKN</h3>
              <h3>Universitas Muhammadiyah Gresik</h3>
              <h3>2022</h3>
            </div>
        </article>
    </section>
  )
}

export default Welcome