import React, { Component } from 'react'

type Props = {
    children: string,
    id?: string
}

type State = {}

export default class Textarea extends Component<Props, State> {
    state = {}

    render() {
        return (
            <textarea name={this.props.id} id={this.props.id}
                className={`w-full rounded p-3 mb-3 focus:outline-secondary outline outline-1 outline-slate-300`}  {...this.props}>
                {this.props.children}
            </textarea>
        )
    }
}