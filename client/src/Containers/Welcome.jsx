import React from 'react'

const Welcome = () => {
  return (
    <section id='welcome' className={`min-h-screen bg-fixed`} style={{ backgroundImage: "url('/bululanjang-mountain.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <article className='absolute min-h-screen top-0 flex flex-col items-center justify-between px-5 text-center w-full text-white pt-16 pb-3'>
            <h1 className='text-transparent'>
              Portal UMKM Desa Bululanjang, Sangkapura, Pulau Bawean, Gresik, Jawa Timur
            </h1>
            <div id="title-wrap" className='text-center p-3 w-screen bg-black bg-opacity-50'>
              <h1 className='text-3xl font-bold'>Portal UMKM</h1>
              <h1 className='text-3xl font-bold uppercase'>Desa Bululanjang</h1>
              <h2 className='text-lg'>Sangkapura, Pulau Bawean</h2>
              <h2 className='text-xl'>Gresik, Jawa Timur</h2>
              <a
              href={'https://www.google.com/maps/place/Bululanjang,+Kec.+Sangkapura,+Kabupaten+Gresik,+Jawa+Timur/@-5.8256514,112.617194,14z/data=!3m1!4b1!4m5!3m4!1s0x2ddf5610e03dacf3:0x42aa83c24e5c6a86!8m2!3d-5.8219198!4d112.6347636'}
              className={'border border-1 border-white w-fit px-5 py-2.5 mx-auto mt-3 hover:bg-white hover:text-black shadow transition duration-300 block'}
              rel={'external noopener noreferrer'}
              target={'_blank'}
              >
                <span>Lokasi Geografis</span>
              </a>
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