import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import CreateColumn from './CreateColumn'

class CardsColumns extends Component {
  constructor() {
    super()
    this.state = {
      columns: [],
      inputValue: ''
    }
  }

  addColumn(columnName) {
    this.setState({
      columns: [...this.state.columns, columnName]
    })
  }

  onChange = e => {
    this.setState({
      inputValue: e.target.value
    })
  }

  render() {
    return (
      <Row>
        {this.state.columns.map((column, i) => (
          <Col xs={3} key={i}>
            colonne {i}
          </Col>
        ))}
        <Col xs={3}>
          <CreateColumn
            columnsCount={this.state.columns.length}
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
