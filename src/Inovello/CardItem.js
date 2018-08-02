import React, { Component, createRef } from 'react'
import { Input } from 'reactstrap'
import isEmpty from 'lodash/isEmpty'
import uuid from 'uuid/v4'

class CardItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: !!this.props.card.text === false,
      card: {}
    }
    this.inputRef = createRef()
  }

  componentDidMount() {
    this.setState({ card: this.props.card })
    this.inputRef.current && this.inputRef.current.focus()
  }

  onToggle = bool => {
    this.setState({
      toggled: bool
    })
  }

  onUpdate = e => {
    this.setState({
      card: isEmpty(this.state.card)
        ? { id: uuid(), text: e.target.value }
        : { ...this.state.card, text: e.target.value }
    })
  }

  validateValue = () => {
    this.onToggle()
    this.props.onUpdate(this.state.card)
  }

  render() {
    return (
      <div>
        {!this.state.toggled ? (
          <div onDoubleClick={() => this.onToggle(true)}>{this.state.card.text}</div>
        ) : (
          <Input
            type={'textarea'}
            value={this.state.card.text}
            onKeyPress={e => e.key === 'Enter' && this.validateValue()}
            innerRef={this.inputRef}
            onChange={e => this.onUpdate(e)}
            onBlur={() => this.onToggle(false)}
          />
        )}
      </div>
    )
  }
}

export default CardItem
