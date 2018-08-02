import React, { Component, Fragment, createRef } from 'react'
import uuid from 'uuid/v4'

import Input from '../HOC/Input'

// Components
import CardItem from './CardItem'
import CreateCard from './CreateCard'

class ColumnItem extends Component {
  constructor() {
    super()
    this.state = {
      column: {},
      toggled: false
    }
  }

  componentDidMount() {
    this.setState({
      column: this.props.column
    })
  }

  componentDidUpdate(prevProps, prevState) {}

  onToggle = bool => {
    this.setState({
      toggled: bool
    })
  }

  updateValue = e => {
    this.setState({
      column: { ...this.state.column, name: e.target.value }
    })
  }

  validateValue = () => {
    this.onToggle(false)
    this.props.onUpdate(this.state.column)
  }

  onUpdate = card => {
    this.setState(
      {
        column: {
          ...this.state.column,
          cards: this.state.column.cards.map(c => (c.id === card.id ? card : c))
        }
      },
      () => this.validateValue()
    )
  }

  onCreate = () => {
    this.setState({
      column: { ...this.state.column, cards: [...this.state.column.cards, { id: uuid(), text: '' }] }
    })
  }

  render() {
    const { column, onRemove, onUpdate } = this.props
    return (
      <div style={columnStyle}>
        <div style={{ display: 'flex' }}>
          {this.state.toggled ? (
            <Input
              value={this.state.column.name}
              onChange={this.updateValue}
              onKeyPress={this.validateValue}
              onBlur={this.onToggle}
              toggled={this.state.toggled}
            />
          ) : (
            <Fragment>
              <div style={{ flexGrow: 1 }} onDoubleClick={() => this.onToggle(true)}>
                {this.state.column.name}
              </div>
              <a href="#" onClick={() => onRemove(column.id)}>
                &times;
              </a>
            </Fragment>
          )}
        </div>
        <div>
          {this.state.column.cards &&
            this.state.column.cards.map((card, i) => <CardItem key={i} card={card} onUpdate={this.onUpdate} />)}
        </div>
        <div style={{ marginTop: 'auto' }}>
          <CreateCard onCreate={this.onCreate} cardCount={this.state.column.cards && this.state.column.cards.length} />
        </div>
      </div>
    )
  }
}

const columnStyle = {
  backgroundColor: '#dedede',
  borderRadius: 3,
  minHeight: 74,
  display: 'flex',
  flexFlow: 'column nowrap',
  padding: 4,
  fontSize: 14
}

const col = {
  background: 'red'
}

export default ColumnItem
