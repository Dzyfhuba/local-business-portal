import React, { Component } from 'react'

type Props = {
    children: any,
    className?: string,
    onClick?: any,
    level?: string
    id?: string
}

type State = {
}

export default class Button extends Component<Props, State> {
  render() {
    if (this.props.level) {
        return (
            <button className={`px-5 py-2.5 bg-secondary text-white rounded ${this.props.className}`} id={this.props.id} {...this.props}>{this.props.children}</button>
        )
    } else {
        return (
            <button className={`px-5 py-2.5 rounded text-white ${this.props.className}`} id={this.props.id} {...this.props}>{this.props.children}</button>
        )
    }
  }
}