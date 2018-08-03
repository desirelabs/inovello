// @flow
import React, { Component, createRef } from 'react'
import isEmpty from 'lodash/isEmpty'
import uuid from 'uuid/v4'

import Input from '../HOC/Input'

// Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateCard, removeCard } from '../store/card/actionsCreators'

// Types
import Card from './Types'

type Props = {
  card: Card,
  updateCard: Function,
  removeCard: Function
}

type State = {
  toggled: boolean
}

class CardItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      toggled: !!this.props.card.text === false
    }
  }

  onToggle = (bool: boolean) => {
    this.setState({
      toggled: bool
    })
  }

  onUpdate = (e: Object) => {
    this.props.updateCard({ ...this.props.card, text: e.target.value })
  }

  validateValue = () => {
    this.onToggle(false)
  }

  render() {
    return (
      <div style={card}>
        {!this.state.toggled ? (
          <div onDoubleClick={() => this.onToggle(true)} style={{ flexGrow: 1 }}>
            {this.props.card.text}
          </div>
        ) : (
          <Input
            type={'textarea'}
            value={this.props.card.text}
            onKeyPress={this.validateValue}
            onChange={this.onUpdate}
            onBlur={this.onToggle}
            toggled={this.state.toggled}
          />
        )}
        {!this.state.toggled && (
          <a href="#" onClick={() => this.props.removeCard(this.props.card.id)}>
            &times;
          </a>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    updateCard: bindActionCreators(updateCard, dispatch),
    removeCard: bindActionCreators(removeCard, dispatch)
  }
}

const card = {
  borderRadius: 3,
  backgroundColor: '#fff',
  padding: 3,
  display: 'flex'
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardItem)
