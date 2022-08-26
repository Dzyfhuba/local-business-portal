import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useNavigate } from 'react-router-dom'
import ButtonAnchor from '../Components/ButtonAnchor'

const Page404 = () => {
    const navigate = useNavigate()

    return (
        <div
            className={`h-screen flex flex-col bg-cover bg-center`}
            style={{
                backgroundImage: 'url("/bululanjang-mountain.jpg")'
            }}
        >
            <section id="container" className='text-center'>
                <article className='p-3 text-center'>
                    <h1 className='text-7xl font-extrabold'>404</h1>
                    <h5 className='text-3xl font-semibold'>Halaman Tidak Ditemukan</h5>
                    <p className='text-lg'>
                        Kami minta maaf, halaman yang anda minta tidak ditemukan.
                    </p>
                    <div id="counter-container" className='flex flex-col items-center gap-3'>
                        <CountdownCircleTimer
                            isPlaying
                            duration={5}
                            colors={['black']}
                            colorsTime={[5]}
                            size={100}
                            onComplete={() => navigate('/')}
                        >
                            {({ remainingTime }) => (
                            <div className='text-2xl'>{remainingTime}</div>
                        )}
                        </CountdownCircleTimer>
                        <ButtonAnchor className='bg-white border border-white shadow hover:bg-transparent' to={'/'}>Pergi Ke Halaman Utama</ButtonAnchor>
                    </div>
                </article>
            </section>
        </div>
    )
}

export default Page404