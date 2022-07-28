import React from 'react'
import PropTypes from 'prop-types'
import Main from '../../../Layouts/Main'
import ButtonAnchor from '../../../Components/ButtonAnchor'

const Home = props => {
    const thead = ['Judul', 'Terakhir Diubah', 'Edit', 'Hapus']

    return (
        <Main>
            <div id="container" className='mx-5 my-6'>
                <ButtonAnchor to='/control/stall/create' className='bg-secondary w-full mb-3'>Create</ButtonAnchor>

                <table className='table-auto w-full'>
                    <colgroup>
                        <col className='w-4/5' />
                        <col />
                        <col />
                        <col />
                    </colgroup>
                    <thead className='bg-primary rounded'>
                        <tr>
                            {
                                thead.map((cell, i) => (
                                    <th key={i} className='text-center'>{cell}</th>
                                ))
                            }
                        </tr>
                    </thead>
                </table>
            </div>
        </Main>
    )
}

Home.propTypes = {}

export default Home