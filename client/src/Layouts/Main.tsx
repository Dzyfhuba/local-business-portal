import React, { Component } from 'react'
import Navbar from '../Containers/Navbar'

type Props = {
    children: any
}

type State = {}

export default class Main extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className="bg-base min-h-screen">
        <Navbar />
        {this.props.children}
      </div>
    )
  }
}