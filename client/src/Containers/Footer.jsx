import React, { useEffect, useRef, useState } from 'react'
import { FaRegCopyright } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import Var from '../Config/Var'

const Footer = () => {
    const footerRef = useRef()
    const [isAbsolute, setIsAbsolute] = useState()

    useEffect(() => {
        let {y: yPos} = footerRef.current.getBoundingClientRect()
        const screen = window.screen.height
        yPos = yPos + 300
        console.log(yPos, screen)
        setIsAbsolute(yPos < screen)
    }, [])

    return (
        <footer className={`bg-secondary text-white p-3 shadow-md w-full${isAbsolute ? ' absolute bottom-0' : 0}`} ref={footerRef}>
            <article>
                <h1 className='font-bold text-center text-xl'>
                    {Var.APP_NAME}
                </h1>
                <small className='flex text-xs items-center justify-center gap-1 text-center'>
                    <FaRegCopyright />KKN Bululanjang
                </small>
                <small className='flex text-xs items-center justify-center gap-1 text-center'>
                    Universitas Muhammadiyah Gresik
                </small>
                <small className='flex text-xs items-center justify-center gap-1 text-center'>
                    2022
                </small>
            </article>
        </footer>
    )
}

export default Footer