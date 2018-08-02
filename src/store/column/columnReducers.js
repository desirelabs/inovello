import { ADD_COLUMN, INIT_COLUMNS } from './actions'

const initialColumnState = {
  name: '',
  cards: []
}

const initialColumnsState = []

export const columns = (state = initialColumnsState, action) => {
  switch (action.type) {
    case ADD_COLUMN:
      return [...state, action.column]
    case INIT_COLUMNS:
      return action.columns
    default:
      return state
  }
}
