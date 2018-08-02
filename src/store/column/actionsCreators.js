import uuid from 'uuid/v4'

import { ADD_COLUMN, INIT_COLUMNS, UPDATE_COLUMN, REMOVE_COLUMN } from './actions'

const persist = columns => {
  window.sessionStorage.setItem('inovello', JSON.stringify(columns))
}

export const addColumn = column => {
  return (dispatch, getState) => {
    dispatch({ type: ADD_COLUMN, column: { id: uuid(), ...column } })
    const persistableColumns = getState().columns
    persist(persistableColumns)
  }
}

export const removeColumn = id => {
  return (dispatch, getState) => {
    dispatch({ type: REMOVE_COLUMN, id })
    const persistableColumns = getState().columns
    persist(persistableColumns)
  }
}

export const updateColumn = column => {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_COLUMN, column })
    const persistableColumns = getState().columns
    persist(persistableColumns)
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
