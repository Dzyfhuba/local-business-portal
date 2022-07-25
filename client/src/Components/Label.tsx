import React, { Component } from 'react'

type Props = {
    htmlFor: string,
    children: any
}

type State = {}

export default class Label extends Component<Props, State> {
  state = {}

  render() {
    return (
      <label htmlFor={this.props.htmlFor}>{this.props.children}</label>
    )
  }
}