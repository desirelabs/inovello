// @flow
import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import uuid from 'uuid/v4'
import isEqual from 'lodash/isEqual'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initColumns } from '../store/column/actionsCreators'

// Components
import CreateColumn from './CreateColumn'
import ColumnItem from './ColumnItem'

type Props = {
  columns: Array<Object>,
  initColumns: Function
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

  componentDidUpdate(prevProps: Object, prevState: Object) {
    if (!isEqual(prevProps.columns, this.props.columns)) {
      this.persist()
    }
  }

  persist = () => {
    const serialized = JSON.stringify(this.props.columns)
    window.sessionStorage.setItem('inovello', serialized)
  }

  componentDidMount() {
    const serialized = window.sessionStorage.getItem('inovello')
    if (serialized) {
      this.props.initColumns([{ name: 'coucou', cards: [] }])
    }
  }

  addColumn = () => {
    // if (this.state.inputValue) {
    //   this.setState({
    //     columns: [
    //       ...this.props.columns,
    //       {
    //         id: uuid(),
    //         name: this.state.inputValue,
    //         cards: []
    //       }
    //     ],
    //     inputValue: ''
    //   })
    // }
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
    // this.setState({
    //   columns: this.props.columns.map(column => (column.id === col.id ? col : column))
    // })
  }

  onRemove = (id: string) => {
    // this.setState({
    //   columns: this.props.columns.filter(column => column.id !== id)
    // })
  }

  render() {
    return (
      <Row>
        {this.props.columns &&
          this.props.columns.map((column, i) => (
            <Col xs={3} key={i}>
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
    initColumns: bindActionCreators(initColumns, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsColumns)
