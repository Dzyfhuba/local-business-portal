import React, { Component } from 'react'

type Props = {
    children: any,
    className?: string,
    onClick?: Function,
    type?: string
}

type State = {
    className: string
}

export default class Button extends Component<Props, State> {
//   componentDidCatch(){
//     if (this.props.type) {
//         switch (this.props.type) {
//             case 'primary':
//                 this.setState({className: ''})
//                 break;
            
//             case 'secondary':
//                 this.setState({className: ''})
//                 break
//             default:
//                 this.setState({className: 'px-5 py-2.5'})
//                 break;
//         }
//     }
//   }

  render() {
    if (this.props.type) {
        return (
            <button className={`px-5 py-2.5 bg-secondary ${this.props.className}`}>{this.props.children}</button>
        )
    } else {
        return (
            <button className={`px-5 py-2.5 ${this.props.className}`}>{this.props.children}</button>
        )
    }
  }
}