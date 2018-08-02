// @flow
import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import uuid from 'uuid/v4'
import isEqual from 'lodash/isEqual'

// Components
import CreateColumn from './CreateColumn'
import ColumnItem from './ColumnItem'

type State = {
  columns: Array<Object>,
  inputValue: string,
  toggled: boolean
}

class CardsColumns extends Component<{}, State> {
  constructor() {
    super()
    this.state = {
      columns: [],
      inputValue: '',
      toggled: false
    }
  }

  componentDidUpdate(prevProps: Object, prevState: Object) {
    if (!isEqual(prevState.columns, this.state.columns)) {
      this.persist()
    }
  }

  persist = () => {
    const serialized = JSON.stringify(this.state.columns)
    window.sessionStorage.setItem('inovello', serialized)
  }

  componentDidMount() {
    const serialized = window.sessionStorage.getItem('inovello')
    if (serialized) {
      this.setState({
        columns: JSON.parse(serialized)
      })
    }
  }

  addColumn = () => {
    if (this.state.inputValue) {
      this.setState({
        columns: [
          ...this.state.columns,
          {
            id: uuid(),
            name: this.state.inputValue,
            cards: []
          }
        ],
        inputValue: ''
      })
    }
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
    this.setState({
      columns: this.state.columns.map(column => (column.id === col.id ? col : column))
    })
  }

  onRemove = (id: string) => {
    this.setState({
      columns: this.state.columns.filter(column => column.id !== id)
    })
  }

  render() {
    return (
      <Row>
        {this.state.columns &&
          this.state.columns.map((column, i) => (
            <Col xs={3} key={i}>
              <ColumnItem column={column} onRemove={this.onRemove} onUpdate={this.onUpdate} />
            </Col>
          ))}
        <Col xs={3}>
          <CreateColumn
            columnsCount={this.state.columns && this.state.columns.length}
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

export default CardsColumns
