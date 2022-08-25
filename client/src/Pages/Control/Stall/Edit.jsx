import React, { useEffect, useState } from 'react'
import Input from '../../../Components/Input'
import Image404 from '../../../Images/404.jpg'
import Label from '../../../Components/Label'
import Main from '../../../Layouts/Main'
import ImageUploading from 'react-images-uploading'
import Button from '../../../Components/Button'
import Zoom from 'react-medium-image-zoom'
import { GrUpdate } from 'react-icons/gr'
import { TbTrashX } from 'react-icons/tb'
import Textarea from '../../../Components/Textarea'
import axios from 'axios'
import Hosts from '../../../Config/Hosts'
import Auth from '../../../Config/Auth'
import swal from 'sweetalert'
import { supabase } from '../../../Config/SupabaseClient'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Var from '../../../Config/Var'
import { nanoid } from '@reduxjs/toolkit'

const Edit = () => {
    const [images, setImages] = useState([])
    const [prevImagesFileName, setPrevImagesFileName] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        axios.get(Hosts.main + '/control/post/' + id)
            .then(async res => {
                console.log(res.data)
                if (res.data.status === 'success') {
                    document.querySelector('input#title').value = res.data.data.title || ''
                    document.querySelector('textarea#content').value = res.data.data.content || ''
                    // setPost(res.data.data)
                    const imagesList = await res.data.data.images.split(',')
                    const supabaseImages = []
                    await imagesList.forEach(async image => {
                        const { data, error } = await supabase.storage.from('post-images').getPublicUrl(image)
                        // console.log('data:', data);
                        // console.log('error:', error);
                        supabaseImages.push(data.publicURL)
                    })
                    setImages(supabaseImages)
                    // document.querySelector('#profilePreview').setAttribute('src', data.publicURL.includes('null') && !error ? ProfileSVG : data.publicURL)
                    setPrevImagesFileName(res.data.data.images.split(','))
                }
            })
    }, [])

    console.log(prevImagesFileName);

    const handleSubmit = async e => {
        e.preventDefault()

        const element = e.target

        console.log('images: ', images);

        const title = element.querySelector('#title').value
        const ImageFilesInImages = images.filter(image => image.file)
        console.log(ImageFilesInImages);
        const data = {
            title: title,
            images: images.map((image, i) => {
                console.log(image);
                if (image.file) {
                    return `${title}-${nanoid()}`
                }
                const filename = image.split('/').pop()
                return filename
            }).toString(),
            content: element.querySelector('#content').value
        }

        // const updated_images = data.images.split(',').map((image, index) => {
        //     return prevImagesFileName[index] !== image
        // })

        // const imageFiles = images.map((image, index) => {
        //     const dataImages = data.images.split(',')
        //     if (image.file) {
        //         image.file.name = dataImages[index]
        //         return {
        //             ...image,
        //         }
        //     }
        // })

        // console.log(updated_images);
        console.log('data: ', data);
        // console.log('imageFiles: ', imageFiles);

        axios.put(Hosts.main + '/control/post/' + id, data, {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            }
        })
            .then(res => {
                if (res.data.status === 'success') {
                    swal('Success', 'Post berhasil dibuat', 'success')
                        .then(async () => {
                            if (images.length) {
                                // const {data: dataImagesOnServerRaw, errorImagesOnServerRaw} = await supabase.storage.from('post-images').list('')
                                const dataImagesOnServer = prevImagesFileName
                                const dataImagesOnClient = data.images.split(',')
                                const forServer = []

                                // for delete
                                dataImagesOnServer.forEach(item => {
                                    if (!dataImagesOnClient.includes(item)) {
                                        forServer.push({
                                            name: item,
                                            action: 'delete'
                                        })
                                    }
                                })

                                // for upload
                                dataImagesOnClient.forEach(item => {
                                    if (!dataImagesOnServer.includes(item)) {
                                        forServer.push({
                                            name: item,
                                            action: 'upload'
                                        })
                                    }
                                })

                                console.log({
                                    dataImagesOnServer,
                                    dataImagesOnClient,
                                    forServer,
                                });

                                console.log(forServer.filter(item => item.action === 'upload').length === ImageFilesInImages.length)

                                // delete image from server
                                forServer.filter(item => item.action === 'delete')
                                    .forEach(async item => {
                                        const { data: dataDelete, error: errorDelete } = await supabase.storage.from('post-images').remove(item.name)
                                        if (errorDelete) console.error(errorDelete)
                                    })

                                // upload image from server
                                forServer.filter(item => item.action === 'upload')
                                    .forEach(async (item, index) => {
                                        const {
                                            data: dataUpload,
                                            error: errorUpload
                                        } = await supabase.storage.from('post-images').upload(item.name, ImageFilesInImages[index].file)
                                        if (errorUpload) console.error(errorUpload)
                                    })
                            }
                            // navigate('/control')
                        })
                } else if (res.data.status === 'error') {
                    swal('Error', 'Post gagal dibuat, perisksa kembali', 'error')
                } else {
                    swal('Warning', res.data.message, res.data.status)
                }
                //     console.log(res.data);
            })
        console.log(images);
    }

    return (
        <Main>
            <Helmet>
                <title>{`${Var.APP_NAME}`}</title>
                <meta name='description' content='Portal UMKM Desa Bululanjang Sangkapura Bawean adalah sebuah aplikasi website yang menampung sejumlah informasi-informasi tentang UMKM di desa Bululanjang untuk mempromosikannya ke internet dengan lebih luas dan membawa nama Bululanjang sebagai pusat bisnisnya.' />
            </Helmet>
            <form className={'mx-5 my-3'} onSubmit={handleSubmit}>
                <div id="wrap" className='text-right'>
                    <Button type='submit' className='bg-secondary text-white'>Simpan</Button>
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
                        <div className="flex flex-col justify-between gap-1">
                            <Button
                                type='button'
                                style={isDragging ? { color: 'red' } : undefined}
                                className={`bg-secondary text-white`}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Click or Drop here
                            </Button>
                            <Button
                                type='button'
                                className={`border border-secondary bg-transparent text-secondary px-5 py-2.5 rounded shadow${imageList.length ? '' : ' hidden'}`}
                                onClick={onImageRemoveAll}
                            >
                                Delete All
                            </Button>
                            {(
                                errors && <div>
                                    {errors.maxFileSize && <span className='text-red-500'>Gambar yang dipilih melebihi 1MB</span>}
                                </div>
                            )}
                            <div
                                id="selected-image"
                                className='flex snap-x overflow-x-scroll justify-start gap-1'
                            >

                                {imageList.map((image, index) => (
                                    <div key={index} className="flex flex-col items-center w-full gap-1 snap-center">
                                        <Zoom wrapStyle={{ height: 96, width: '100%', objectFit: 'cover' }}>
                                            <img src={image['data_url'] || images[index]} alt={document.querySelector('#title').value} className='h-full w-full object-cover' />
                                        </Zoom>
                                        <div className="flex justify-center gap-1">
                                            <button type='button' onClick={() => onImageUpdate(index)} className={'px-5 py-2.5 bg-yellow-500  rounded shadow'}>
                                                <GrUpdate />
                                            </button>
                                            <button type='button' onClick={() => onImageRemove(index)} className={'px-5 py-2.5 bg-red-500 text-white rounded shadow'}>
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

export default Edit