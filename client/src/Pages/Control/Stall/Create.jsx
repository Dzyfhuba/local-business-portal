import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
import { supabase } from '../../../Config/SupabaseClient'

const Create = props => {
    const [image, setImage] = useState(String)

    useEffect(() => {
        getImage().then(data => setImage(data))
    }, [])

    const getImage = async () => {
        const { data, error } = await supabase.storage.from('post-images').getPublicUrl('Screenshot (34).png')
        console.log('error', error)
        console.log('data', data)
        return data.publicURL
    }

    return (
        <img src={image} alt="screenshot" />
    )
}

Create.propTypes = {}

export default Create