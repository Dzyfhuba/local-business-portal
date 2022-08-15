import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { MdClose } from 'react-icons/md'
import anime from 'animejs/'

const Modal = props => {
    const [isShow, setIsShow] = useState(Boolean)

    useEffect(() => {
        window.addEventListener('keyup', e => {
            if (e.key === 'Escape' && isShow) {
                toggle(false)
            }
        })
    }, [isShow])

    const toggle = show => {
        if (show) {
            setIsShow(show)
            anime({
                targets: '.modal-core',
                top: '50%'
            })
        } else {
            anime({
                targets: '.modal-core',
                top: '-50%'
            })
            setTimeout(() => {
                setIsShow(show)
            }, 300);
        }
    }

    return (
        <>
            <Button className={props.triggerClassName} onClick={() => toggle(true)}>{props.triggerBody}</Button>
            <div
                aria-label='modal'
                className={`fixed h-screen w-screen bg-black bg-opacity-75 top-0 left-0 z-50 justify-center items-center modal${isShow ? ' block' : ' hidden'}`}
                onClick={e => e.target === e.currentTarget ? toggle(false) : null}
            >
                <div
                    className='w-4/5 bg-base rounded fixed modal-core'
                    style={{
                        top: '-50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <div className='p-3 flex flex-nowrap justify-between'>
                        <span className='self-center text-lg font-semibold'>{props.head}</span>
                        <Button className='h-11 aspect-square' onClick={() => toggle(false)}>
                            <MdClose className='text-3xl mx-auto' />
                        </Button>
                    </div>
                    <div className='p-3 border-y'>{props.body}</div>
                    {props.foot ? (
                        <div className='p-3'>{props.foot}</div>
                    ) : null}
                </div>
            </div>
        </>
    )
}

Modal.defaultProps = {
    triggerBody: 'Open Modal',
    body: 'Body',
}

Modal.propTypes = {
    head: PropTypes.any.isRequired,
    body: PropTypes.any.isRequired,
    foot: PropTypes.any,
    triggerClassName: PropTypes.string,
    triggerBody: PropTypes.any.isRequired,
}

export default Modal