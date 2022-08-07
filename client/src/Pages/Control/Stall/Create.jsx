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

const Create = () => {
    const [images, setImages] = useState([])
    
    const handleSubmit = e => {
        e.preventDefault()
    }

    const handleResize = (e) => {
        const target = e.target
        target.style.height = 'auto'
        target.style.height = target.scrollHeight + 'px'
    }

    return (
        <Main>
            <form className={'mx-5 my-3'} onSubmit={handleSubmit}>
                <Label for={'title'}>Judul</Label>
                <Input id={'title'} placeholder={'Judul...'} />
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
                                type='text'
                                style={isDragging ? { color: 'red' } : undefined}
                                className={`bg-secondary text-white px-5 py-2.5 rounded shadow`}
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
                                            <button onClick={() => onImageUpdate(index)} className={'px-5 py-2.5 bg-yellow-500 text-white rounded shadow'}>
                                                <GrUpdate />
                                            </button>
                                            <button onClick={() => onImageRemove(index)} className={'px-5 py-2.5 bg-red-500 text-white rounded shadow'}>
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
                <Textarea id='content' placeholder={'Konten atau deskripsi produk...'} onInput={handleResize} />
            </form>
        </Main>
    )
}

export default Create