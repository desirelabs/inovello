import uuid from 'uuid/v4'

import { ADD_COLUMN, INIT_COLUMNS, UPDATE_COLUMN, REMOVE_COLUMN } from './actions'

export const addColumn = column => {
  return (dispatch, getState) => {
    dispatch({ type: ADD_COLUMN, column: { id: uuid(), ...column } })
  }
}

export const removeColumn = id => {
  console.log(id)
  return dispatch => {
    dispatch({ type: REMOVE_COLUMN, id })
  }
}

export const updateColumn = column => {
  return (dispatch, getState) => {
    console.log(getState().columns)
    dispatch({ type: UPDATE_COLUMN, column })
  }
}

export const initColumns = () => {
  const serialized = window.sessionStorage.getItem('inovello')
  if (serialized) {
    const columns = JSON.parse(serialized)
    return dispatch => {
      dispatch({ type: INIT_COLUMNS, columns })
    }
  }
  return dispatch => {
    dispatch({ type: INIT_COLUMNS, columns: [] })
  }
}
