import React, { Component, Fragment, createRef } from 'react'
import uuid from 'uuid/v4'

import Input from '../HOC/Input'

// Components
import CardItem from './CardItem'
import CreateCard from './CreateCard'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addCard } from '../store/card/actionsCreators'

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
    this.props.addCard({ id: uuid(), text: '', colId: this.props.colId })
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
          {this.props.cards.filter(c => c.colId === this.props.colId).map(card => {
            return <CardItem key={card.id} card={card} />
          })}
        </div>
        <div style={{ marginTop: 'auto' }}>
          <CreateCard
            colId={this.state.column.id}
            cardCount={this.state.column.cards && this.state.column.cards.length}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: Object) => {
  return {
    cards: state.cards
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    addCard: bindActionCreators(addCard, dispatch)
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnItem)
