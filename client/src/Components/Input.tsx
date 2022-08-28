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
            className={`w-full rounded p-3 mb-3 focus:outline-secondary outline outline-1 outline-slate-300 block text-black ${className}`} 
            id={id} 
            {...rest}/>
            )
        }
    }