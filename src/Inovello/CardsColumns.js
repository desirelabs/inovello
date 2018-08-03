// @flow
import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import isEqual from 'lodash/isEqual'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initColumns, addColumn, updateColumn, removeColumn } from '../store/column/actionsCreators'
import { initCards, removeCard } from '../store/card/actionsCreators'

// Components
import CreateColumn from './CreateColumn'
import ColumnItem from './ColumnItem'

// Types
import { Card, Column } from './Types'

type Props = {
  columns: Array<Column>,
  cards: Array<Card>,
  removeCard: Function,
  initCards: Function,
  initColumns: Function,
  addColumn: Function,
  updateColumn: Function,
  removeColumn: Function
}

type State = {
  inputValue: string,
  toggled: boolean
}

class CardsColumns extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      inputValue: '',
      toggled: false
    }
  }

  componentDidMount() {
    this.props.initColumns()
    this.props.initCards()
  }

  addColumn = () => {
    this.props.addColumn({
      name: this.state.inputValue
    })

    this.setState({ inputValue: '' })
  }

  onToggle = (bool: boolean) => {
    this.setState({ toggled: bool })
  }

  onChange = (e: Object) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  onUpdate = (col: Object) => {
    this.props.updateColumn(col)
  }

  onRemove = (id: string) => {
    this.props.removeColumn(id)
    this.props.cards.filter(c => c.colId === id).forEach(el => this.props.removeCard(el.id))
  }

  render() {
    return (
      <Row>
        {this.props.columns.map(column => (
          <Col xs={3} key={column.id}>
            <ColumnItem column={column} onRemove={this.onRemove} colId={column.id} />
          </Col>
        ))}
        <Col xs={3}>
          <CreateColumn
            columnsCount={this.props.columns && this.props.columns.length}
            addColumn={this.addColumn}
            onChange={this.onChange}
            inputValue={this.state.inputValue}
            onToggle={this.onToggle}
            toggled={this.state.toggled}
          />
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state: Object) => {
  return {
    columns: state.columns,
    cards: state.cards
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    initColumns: bindActionCreators(initColumns, dispatch),
    initCards: bindActionCreators(initCards, dispatch),
    addColumn: bindActionCreators(addColumn, dispatch),
    updateColumn: bindActionCreators(updateColumn, dispatch),
    removeColumn: bindActionCreators(removeColumn, dispatch),
    removeCard: bindActionCreators(removeCard, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsColumns)
