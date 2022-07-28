import React from 'react'
import PropTypes from 'prop-types'
import Main from '../../../Layouts/Main'
import ButtonAnchor from '../../../Components/ButtonAnchor'

const Home = props => {
    return (
        <Main>
            <div id="container" className='mx-5 my-6'>
                <ButtonAnchor to='/control/stall/create' className='bg-secondary w-full mb-3'>Create</ButtonAnchor>

                <div id="list-head" className='w-full bg-primary rounded mb-3'>
                    <ul className='flex h-12'>
                        <li className='w-1/2 text-center flex justify-center items-center px-2 py-1'>Judul</li>
                        <li className='text-center flex justify-center items-center px-2 py-1'>Terakhir Diubah</li>
                        <li className='text-center flex justify-center items-center px-2 py-1'>Edit</li>
                        <li className='text-center flex justify-center items-center px-2 py-1'>Hapus</li>
                    </ul>
                </div>

                <div id="list-body">
                </div>
            </div>
        </Main>
    )
}

Home.propTypes = {}

export default Home