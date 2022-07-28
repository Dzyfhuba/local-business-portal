import React from 'react'
import { useParams } from 'react-router-dom'
// import PropTypes from 'prop-types'

const Item = props => {
    const {stall, slug} = useParams()

    return (
        <>
            <div>stall: {stall}</div>
            <div>slug: {slug}</div>
        </>
    )
}

Item.propTypes = {}

export default Item