import React, { Component } from 'react'

type Props = {
    children: any
}

type State = {}

export default class Main extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className="bg-base min-h-screen">
        {this.props.children}
      </div>
    )
  }
}