import { ADD_COLUMN, INIT_COLUMNS, UPDATE_COLUMN, REMOVE_COLUMN } from './actions'

const initialColumnState = {
  name: '',
  cards: []
}

const initialColumnsState = []

export const columns = (state = initialColumnsState, action) => {
  switch (action.type) {
    case ADD_COLUMN:
      return [...state, action.column]
    case UPDATE_COLUMN:
      return state.map(c => {
        if (c.id === action.column.id) {
          return action.column
        }
        return c
      })
    case REMOVE_COLUMN:
      console.log(action.id)
      return state.filter(c => c.id !== action.id)
    case INIT_COLUMNS:
      return action.columns
    default:
      return state
  }
}
