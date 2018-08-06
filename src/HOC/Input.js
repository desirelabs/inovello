import React, { Component } from 'react'
import { Input as BootstrapInput } from 'reactstrap'

class Input extends Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
  }

  componentDidMount() {
    if (this.props.toggled) {
      this.focus()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.toggled) {
      this.focus()
    }
  }

  focus = () => this.inputRef.current && this.inputRef.current.focus()

  render() {
    return (
      this.props.toggled && (
        <BootstrapInput
          onChange={this.props.onChange}
          value={this.props.value}
          onKeyUp={e => {
            if (e.keyCode === 27) {
              this.props.onBlur(false)
            } else if (e.keyCode === 13) {
              this.props.onKeyPress()
            }
          }}
          innerRef={this.inputRef}
          onBlur={() => this.props.onBlur(false)}
        />
      )
    )
  }
}

export default Input
