import React, { Component } from 'react'

type Props = {
    type?: string,
    id?: string,
    className?: string,
    [rest: string]: any,
}

type State = {}

export default class Input extends Component<Props, State> {
    static defaultProps = {
        type: 'text'
    }
    state = {}
    
    render() {
        const {type, id, className, ...rest} = this.props
        return (
            <input 
            type={type}
            className={`w-full rounded p-3 focus:outline-secondary text-black ${className}`} 
            id={id} 
            {...rest}/>
            )
        }
    }