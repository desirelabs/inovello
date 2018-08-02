// @flow
import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import isEqual from 'lodash/isEqual'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initColumns, addColumn, updateColumn, removeColumn } from '../store/column/actionsCreators'

// Components
import CreateColumn from './CreateColumn'
import ColumnItem from './ColumnItem'

type Props = {
  columns: Array<Object>,
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
  }

  render() {
    return (
      <Row>
        {this.props.columns &&
          this.props.columns.map(column => (
            <Col xs={3} key={column.id}>
              <ColumnItem column={column} onRemove={this.onRemove} onUpdate={this.onUpdate} />
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
    columns: state.columns
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    initColumns: bindActionCreators(initColumns, dispatch),
    addColumn: bindActionCreators(addColumn, dispatch),
    updateColumn: bindActionCreators(updateColumn, dispatch),
    removeColumn: bindActionCreators(removeColumn, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsColumns)
