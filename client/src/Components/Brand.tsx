import React, { Component } from 'react'

type Props = {
    className?: string,
    children: any
}

type State = {}

export default class Brand extends Component<Props, State> {
  state = {}

  render() {
    return (
        <span className={`tracking-wider uppercase ${this.props.className}`} {...this.props}>
            {this.props.children}
        </span>
    )
  }
}