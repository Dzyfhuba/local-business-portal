import React, { useState } from 'react'
import Input from '../../../Components/Input'
import Label from '../../../Components/Label'
import Main from '../../../Layouts/Main'
import ImageUploading from 'react-images-uploading'
import Button from '../../../Components/Button'
import Zoom from 'react-medium-image-zoom'
import {GrUpdate} from 'react-icons/gr'
import {TbTrashX} from 'react-icons/tb'
import Textarea from '../../../Components/Textarea'
import axios from 'axios'
import Hosts from '../../../Config/Hosts'
import Auth from '../../../Config/Auth'
import swal from 'sweetalert'
import { supabase } from '../../../Config/SupabaseClient'
import { useNavigate } from 'react-router-dom'

const Create = () => {
    const [images, setImages] = useState([])
    const navigate = useNavigate()
    
    const handleSubmit = async e => {
        e.preventDefault()

        const element = e.target

        console.log('images: ', images);

        const title = element.querySelector('#title').value
        const data = {
            title: title,
            images: images.map((image, i) => {
                const filename = `${title}-${i}-${(new Date()).getTime()}`
                return filename
            }).toString(),
            content: element.querySelector('#content').value
        }

        console.log('data: ', data);

        axios.post(Hosts.main + '/control/post', data, {
            headers: {
              'Authorization': `Bearer ${Auth.getToken()}`
            }
          })
            .then(res => {
                if (res.data.status === 'success') {
                    swal('Success', 'Post berhasil dibuat', 'success')
                        .then(async () => {
                            const storedDataImage  = data.images.split(',')
                            images.map(async (image, i) => {
                                const filename = storedDataImage[i]
                                const { error } = await supabase.storage.from('post-images').upload(filename, image.file)
                                console.log(error);
                            })
                            setImages([])
                            element.reset()
                            navigate('/control')
                        })
                } else if (res.data.status === 'error') {
                    swal('Error', 'Post gagal dibuat, perisksa kembali', 'error')
                } else {
                    swal('Warning', res.data.message, res.data.status)
                }
                console.log(res.data);
            })
    }

    return (
        <Main>
            <form className={'mx-5 my-3'} onSubmit={handleSubmit}>
                <div id="wrap" className='text-right'>
                    <Button type='submit' className=' bg-secondary py-2.5 px-5 rounded'>Simpan</Button>
                </div>
                <Label for={'title'}>Judul</Label>
                <Input id={'title'} placeholder={'Judul...'} required />
                <Label for={'images'}>Images</Label>
                <ImageUploading
                    value={images}
                    onChange={imageList => setImages(imageList)}
                    maxNumber={10}
                    dataURLKey="data_url"
                    maxFileSize={1000000}
                    onError={e => console.log(e)}
                    multiple={true}
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
                                className={`bg-secondary  px-5 py-2.5 rounded shadow`}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Click or Drop here
                            </Button>
                            {(
                                errors && <div>
                                    {errors.maxFileSize && <span className='text-red-500'>Gambar yang dipilih melebihi 1MB</span>}
                                </div>
                            )}
                            &nbsp;
                            <div
                            id="selected-image"
                            className='flex snap-x overflow-x-scroll justify-start gap-1'
                            >
                                
                                {imageList.map((image, index) => (
                                    <div key={index} className="flex flex-col items-center w-full mb-3 gap-1 snap-center">
                                        <Zoom wrapStyle={{ height: 96, width: '100%', objectFit: 'cover' }}>
                                            <img src={image['data_url']} alt="" className='h-full w-full object-cover' />
                                        </Zoom>
                                        <div className="flex justify-center gap-1">
                                            <button onClick={() => onImageUpdate(index)} className={'px-5 py-2.5 bg-yellow-500  rounded shadow'}>
                                                <GrUpdate />
                                            </button>
                                            <button onClick={() => onImageRemove(index)} className={'px-5 py-2.5 bg-red-500  rounded shadow'}>
                                                <TbTrashX />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </ImageUploading>
                <Label for='content'>Konten / Deskripsi Produk</Label>
                <Textarea id='content' placeholder={'Konten atau deskripsi produk...'} required />
            </form>
        </Main>
    )
}

export default Create