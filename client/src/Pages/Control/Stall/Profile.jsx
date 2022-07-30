import React from 'react'
import PropTypes from 'prop-types'
import Main from '../../../Layouts/Main'
import Label from '../../../Components/Label'
import Input from '../../../Components/Input'
import Button from '../../../Components/Button'
import Textarea from '../../../Components/Textarea'

const Profile = props => {
    const handleSubmit = e => {
        e.preventDefault()

        const form = e.target
        
        const data = {
            name: form.querySelector('#name').value,
            address: form.querySelector('#address').value,
            phone: form.querySelector('#phone').value,
            description: form.querySelector('#description').value,
        }

        console.log(data)
    }

    return (
        <Main>
            <div id="container" className='mx-5 mt-3'>
                <form onSubmit={handleSubmit}>
                    <div className="text-end">
                        <Button type='submit' className='bg-secondary px-5 py-2.5 rounded shadow'>Simpan</Button>
                    </div>
                    <Label htmlFor='name'>Nama</Label>
                    <Input id='name' placeholder='Nama...' />
                    <Label htmlFor='address'>Alamat</Label>
                    <Input id='address' placeholder='Alamat...' />
                    <Label htmlFor='phone'>Nomor Telepon</Label>
                    <Input id='phone' type='tel' placeholder='Nomor Telepon...' />  
                    <Label htmlFor='description'>Deskripsi</Label>
                    <Textarea id='description' placeholder='Deskripsi...' />
                </form>
            </div>
        </Main>
    )
}

Profile.propTypes = {}

export default Profile