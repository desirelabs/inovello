import { ADD_COLUMN, INIT_COLUMNS } from './actions'

export const addColumn = column => {
  return dispatch => {
    dispatch({ type: ADD_COLUMN, column })
  }
}

export const initColumns = columns => {
  console.log(columns)
  return dispatch => {
    dispatch({ type: INIT_COLUMNS, columns })
  }
}
