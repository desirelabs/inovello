import { ADD_CARD, REMOVE_CARD, UPDATE_CARD } from './actions'

const initialState = []

export const cards = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD:
      return [...state, action.card]
    case REMOVE_CARD:
      return state.filter(c => c.id !== action.id)
    case UPDATE_CARD:
      return state.map(c => (c.id === action.card.id ? action.card : c))
    default:
      return state
  }
}
