import React, { Component, createRef } from 'react'
import isEmpty from 'lodash/isEmpty'
import uuid from 'uuid/v4'

import Input from '../HOC/Input'

class CardItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: !!this.props.card.text === false,
      card: {}
    }
  }

  componentDidMount() {
    this.setState({ card: this.props.card })
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
    this.state.card.text && this.props.onUpdate(this.state.card)
  }

  render() {
    return (
      <div style={card}>
        {!this.state.toggled ? (
          <div onDoubleClick={() => this.onToggle(true)}>{this.state.card.text}</div>
        ) : (
          <Input
            type={'textarea'}
            value={this.state.card.text}
            onKeyPress={this.validateValue}
            onChange={this.onUpdate}
            onBlur={this.onToggle}
            toggled={this.state.toggled}
          />
        )}
      </div>
    )
  }
}

const card = {
  borderRadius: 3,
  backgroundColor: '#fff',
  padding: 3
}

export default CardItem
