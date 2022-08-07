import React, { Component } from 'react'

type Props = {
    type?: string,
    id?: string
}

type State = {}

export default class Input extends Component<Props, State> {
    static defaultProps = {
        type: 'text'
    }
    state = {}
    
    render() {
        return (
            <input type={this.props.type} className={`w-full rounded p-3 mb-3 focus:outline-secondary outline outline-1 outline-slate-300 text-black`} id={this.props.id} name={this.props.id} {...this.props}/>
            )
        }
    }