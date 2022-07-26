import { useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
import ImageUploading from 'react-images-uploading'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import Button from '../../../Components/Button'
import Input from '../../../Components/Input'
import Label from '../../../Components/Label'
import Textarea from '../../../Components/Textarea'
import Auth from '../../../Config/Auth'
import Hosts from '../../../Config/Hosts'
import { supabase } from '../../../Config/SupabaseClient'
import Var from '../../../Config/Var'
import ProfileSVG from '../../../Images/profile.svg'
import Main from '../../../Layouts/Main'

const Profile = props => {
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [description, setDescription] = useState()
    const [editable, setEditable] = useState(false)
    const [images, setImages] = useState([])
    const navigate = useNavigate()
    const [profile, setProfile] = useState({})

    useEffect(() => {
        axios.get(`${Hosts.main}/control/${Auth.getUser().username}/profile`)
            .then(async res => {
                console.log(res.data);
                if (res.data.status === 'success') {
                    document.querySelector('input#name').value = res.data.data.name
                    // setName(res.data.data.name)
                    document.querySelector('input#address').value = res.data.data.address
                    // setAddres.data.datas(res.data.data.addres.data.datas)
                    // document.querySelector('input.PhoneInputInput').value = res.data.data.phone
                    setPhone(res.data.data.phone)
                    document.querySelector('textarea#description').value = res.data.data.description
                    // setDescription(data.description)
                    const { data, error } = await supabase.storage.from('profile').getPublicUrl(res.data.data.profile)
                    console.log('data:', data);
                    console.log('error:', error);
                    document.querySelector('#profilePreview').setAttribute('src', data.publicURL.includes('null') && !error ? ProfileSVG : data.publicURL)
                    res.data.data.profile = data.publicURL.includes('null') && !error ? ProfileSVG : data.publicURL
                    setProfile(res.data.data)
                }
            })
    }, [images])

    const handleSubmit = async e => {
        e.preventDefault()

        const profileFileName = `${Auth.getUser().username}${(new Date()).getTime()}`

        const data = {
            name: name,
            profile: images.length ? profileFileName : undefined,
            address: address,
            phone: phone,
            description: description,
        }
        console.log(data);
        axios.put(`${Hosts.main}/control/:stall/profile`, data, {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            },
        }).then(async res => {
            if (res.data.status === 'success') {
                const { data, error } = await supabase.storage.from('profile').list()
                console.log('error', error)
                console.log('data', images[0])
                const isExist = data.map(item => item.name.includes(Auth.getUser().username))
                console.log(isExist);
                if (images.length) {
                    if (isExist.includes(true)) {
                        console.log((new Date(Auth.getUser().updated_at)).getTime());
                        await supabase.storage.from('profile').remove(`${profile.profile}`)
                        const { data, error } = await supabase.storage.from('profile').upload(profileFileName, images[0].file)
                        console.log(data, error);
                    } else {
                        const { data, error } = await supabase.storage.from('profile').upload(profileFileName, images[0].file)
                        console.log(data, error);
                    }
                }
                setEditable(false)
                setImages([])
                swal('Success', 'Profil berhasil diubah', 'success')
                    .then(() => {
                        navigate(0)
                        // document.querySelector('nav button img').setAttribute('src', images[0].data_url)

                    })
            }
            if (res.data.status === 'error') {
                swal('Failed', 'Profil gagal diubah. Hubungi pengembang untuk perbaikan. Terima kasih.', 'failed')
            }
            console.log(res.data)
        })

    }

    return (
        <Main>
            <Helmet>
                <title>{`${Var.APP_NAME}`}</title>
                <meta name='description' content='Portal UMKM Desa Bululanjang Sangkapura Bawean adalah sebuah aplikasi website yang menampung sejumlah informasi-informasi tentang UMKM di desa Bululanjang untuk mempromosikannya ke internet dengan lebih luas dan membawa nama Bululanjang sebagai pusat bisnisnya.' />
            </Helmet>
            <div id="container" className='mx-5 mt-3'>
                <ImageUploading
                    value={images}
                    onChange={imageList => setImages(imageList)}
                    maxNumber={1}
                    dataURLKey="data_url"
                    maxFileSize={500000}
                    onError={e => console.log(e)}
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                        errors
                    }) => (
                        // write your building UI
                        <div className="flex flex-col justify-between">
                            <Button
                                type='button'
                                style={isDragging ? { color: 'red' } : undefined}
                                className={`bg-secondary text-white px-5 py-2.5 rounded shadow${editable && !images.length ? ' block' : ' hidden'}`}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Click or Drop here
                            </Button>
                            {(
                                errors && <div>
                                    {errors.maxFileSize && <span className='text-red-500'>Gambar yang dipilih melebihi 500kb</span>}
                                </div>
                            )}
                            &nbsp;
                            {imageList.map((image, index) => (
                                <div key={index} className="flex justify-center w-full mb-3 gap-1">
                                    <img src={image['data_url']} alt="" className='h-24 object-cover' />
                                    <div className="flex flex-col justify-center gap-1">
                                        <button onClick={() => onImageUpdate(index)} className={'px-5 py-2.5 bg-yellow-500  rounded shadow'}>Update</button>
                                        <button onClick={() => onImageRemove(index)} className={'px-5 py-2.5 bg-red-500 text-white rounded shadow'}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ImageUploading>
                <div className="text-center">
                    <img
                        // src={'/profile.svg'}
                        src={profile.profile}
                        id={'profilePreview'}
                        className={'shadow-md mb-3 rounded-full h-80 aspect-square mx-auto object-cover'}
                        alt={'profile preview'}
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-end">
                        <Button type='button' className={`px-5 py-2.5 rounded shadow bg-yellow-400${!editable ? ' block' : ' hidden'}`} onClick={() => setEditable(true)}>Edit</Button>
                        <Button type='submit' className={`bg-secondary text-white px-5 py-2.5 rounded shadow${editable ? ' block' : ' hidden'}`}>Simpan</Button>
                    </div>
                    <Label htmlFor='name'>Nama</Label>
                    <Input id='name' placeholder='Nama...' onChange={e => setName(e.target.value)} readOnly={!editable} />
                    <Label htmlFor='address'>Alamat</Label>
                    <Input id='address' placeholder='Alamat...' onChange={e => setAddress(e.target.value)} readOnly={!editable} />
                    <Label htmlFor='phone'>Nomor Telepon</Label>
                    <PhoneInput
                        defaultCountry={'ID'}
                        placeholder='Nomor Telepon...' value={phone} onChange={setPhone}
                        className='outline-1 outline-slate-300 focus-within:outline-secondary outline p-3 bg-white'
                        readOnly={!editable}
                    />
                    <Label htmlFor='description'>Deskripsi</Label>
                    <Textarea id='description' placeholder='Deskripsi...' rows='20' onChange={e => setDescription(e.target.value)} readOnly={!editable} />
                </form>
            </div>
        </Main>
    )
}

Profile.propTypes = {}

export default Profile