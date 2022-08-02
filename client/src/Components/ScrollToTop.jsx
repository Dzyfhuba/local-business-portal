import React, { useEffect, useState } from 'react'
import Button from './Button'
import { animateScroll } from 'react-scroll';
import { BiArrowToTop } from 'react-icons/bi'

export const ScrollToTop = () => {
    const [position, setPosition] = useState(Number)
    const { innerHeight } = window

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setPosition(window.scrollY)
        })
    }, [position])

    const toTop = () => {
        animateScroll.scrollToTop()
    }
    return (
        <Button onClick={() => toTop()} className={`fixed bottom-1 right-1 bg-primary rounded-full p-3 shadow-md${innerHeight/2 <= position ? '' : ' hidden'}`}>
            <span>
                <BiArrowToTop className='text-3xl' />
            </span>
        </Button>
    )
}