import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Main from '../../../Layouts/Main'
import Label from '../../../Components/Label'
import Input from '../../../Components/Input'
import Button from '../../../Components/Button'
import Textarea from '../../../Components/Textarea'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import axios from 'axios'
import Hosts from '../../../Config/Hosts'
import Auth from '../../../Config/Auth'

const Profile = props => {
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [description, setDescription] = useState()

    useEffect(() => {
        axios.get(`${Hosts.main}/control/${Auth.getUser().username}/profile`)
            .then(res => {
                if (res.data.status === 'success') {
                    const data = res.data.data
                    document.querySelector('input#name').value = data.name
                    document.querySelector('input#address').value = data.address
                    document.querySelector('input.PhoneInputInput').value = data.phone
                    document.querySelector('textarea#description').value = data.description
                }
                console.log(res.data.data)
            })
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            name: name,
            address: address,
            phone: phone,
            description: description,
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
                    <Input id='name' placeholder='Nama...' onChange={e => setName(e.target.value)} />
                    <Label htmlFor='address'>Alamat</Label>
                    <Input id='address' placeholder='Alamat...' />
                    <Label htmlFor='phone'>Nomor Telepon</Label>
                    <PhoneInput 
                    defaultCountry={'ID'}
                    placeholder='Nomor Telepon...' value={phone} onChange={setPhone} 
                    className='outline-1 outline-slate-300 focus-within:outline-secondary outline p-3 bg-white'
                    />
                    <Label htmlFor='description'>Deskripsi</Label>
                    <Textarea id='description' placeholder='Deskripsi...' rows='20'/>
                </form>
            </div>
        </Main>
    )
}

Profile.propTypes = {}

export default Profile