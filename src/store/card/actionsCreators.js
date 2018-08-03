import uuid from 'uuid/v4'

import { ADD_CARD, REMOVE_CARD, UPDATE_CARD, CREATE_CARD, INIT_CARDS } from './actions'

const persist = cards => {
  window.sessionStorage.setItem('inovello_cards', JSON.stringify(cards))
}

export const addCard = card => {
  return (dispatch, getState) => {
    dispatch({ type: ADD_CARD, card: { ...card, id: uuid(), colId: card.colId } })
    const persistableCards = getState().cards
    persist(persistableCards)
  }
}

export const removeCard = id => {
  return (dispatch, getState) => {
    dispatch({ type: REMOVE_CARD, id })
    const persistableCards = getState().cards
    persist(persistableCards)
  }
}

export const updateCard = card => {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_CARD, card })
    const persistableCards = getState().cards
    persist(persistableCards)
  }
}

export const initCards = () => {
  const serialized = window.sessionStorage.getItem('inovello_cards')
  if (serialized) {
    const cards = JSON.parse(serialized)
    return dispatch => {
      dispatch({ type: INIT_CARDS, cards })
    }
  }
  return dispatch => {
    dispatch({ type: INIT_CARDS, cards: [] })
  }
}
