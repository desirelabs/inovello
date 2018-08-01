import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import CreateColumn from './CreateColumn'

class CardsColumns extends Component {
  constructor() {
    super()
    this.state = {
      columns: [],
      inputValue: '',
      toggle: false
    }
  }

  addColumn = () => {
    if (this.state.inputValue) {
      this.setState({
        columns: [...this.state.columns, this.state.inputValue],
        inputValue: ''
      })
    }
  }

  onChange = e => {
    this.setState({
      inputValue: e.target.value
    })
  }

  onToggle = bool => {
    this.setState({
      toggle: bool
    })
  }

  render() {
    return (
      <Row>
        {this.state.columns.map((column, i) => (
          <Col xs={3} key={i}>
            {column}
          </Col>
        ))}
        <Col xs={3}>
          <CreateColumn
            columnsCount={this.state.columns.length}
            toggle={this.state.toggle}
            onToggle={this.onToggle}
            addColumn={this.addColumn}
            onChange={this.onChange}
            inputValue={this.state.inputValue}
          />
        </Col>
      </Row>
    )
  }
}

export default CardsColumns
