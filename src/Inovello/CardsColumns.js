// @flow
import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import isEqual from 'lodash/isEqual'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initColumns, addColumn, updateColumn, removeColumn, setOrdered } from '../store/column/actionsCreators'
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

const grid = 8

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

  reorder = (list: Array<Column>, startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const columns = this.reorder(this.props.columns, result.source.index, result.destination.index)

    this.props.setOrdered(columns)
  }

  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto'
  })

  getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
  })

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={this.getListStyle(snapshot.isDraggingOver)}>
              {this.props.columns.map((column, index) => (
                <Draggable key={column.id} draggableId={column.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={this.getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                      <ColumnItem column={column} onRemove={this.onRemove} colId={column.id} />
                    </div>
                  )}
                </Draggable>
              ))}
              <div style={{}}>
                <CreateColumn
                  columnsCount={this.props.columns && this.props.columns.length}
                  addColumn={this.addColumn}
                  onChange={this.onChange}
                  inputValue={this.state.inputValue}
                  onToggle={this.onToggle}
                  toggled={this.state.toggled}
                />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
    setOrdered: bindActionCreators(setOrdered, dispatch),
    initCards: bindActionCreators(initCards, dispatch),
    addColumn: bindActionCreators(addColumn, dispatch),
    updateColumn: bindActionCreators(updateColumn, dispatch),
    removeColumn: bindActionCreators(removeColumn, dispatch),
    removeCard: bindActionCreators(removeCard, dispatch)
  }
}

const col = {
  width: 250
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsColumns)
