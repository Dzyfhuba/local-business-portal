import React, { Component } from 'react'
import Main from '../../Layouts/Main'

type Props = {
  auth: any
}

type State = {}

export default class Home extends Component<Props, State> {
  state = {}

  render() {
    return (
      <Main>
        main
      </Main>
    )
  }
}