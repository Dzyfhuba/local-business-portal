import React, { Component } from 'react'

type Props = {
    children: any,
    className?: string,
    [rest: string]: any
}

type State = {
}

export default class Button extends Component<Props, State> {
    render() {
        const {className, children, ...rest} = this.props
        return (
            <button className={`px-5 py-2.5 ${className}`} {...rest}>{children}</button>
        )
    }
}