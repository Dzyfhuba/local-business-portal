import React, { Component } from 'react'
import { Link } from 'react-router-dom'

type Props = {
    to: string,
    children: any
}

type State = {}

export default class ButtonAnchor extends Component<Props, State> {
  state = {}

  render() {
    return (
      <Link {...this.props}>{this.props.children}</Link>
    )
  }
}