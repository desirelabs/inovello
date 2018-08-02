import uuid from 'uuid/v4'

import { ADD_CARD, REMOVE_CARD, UPDATE_CARD } from './actions'

export const addCard = card => {
  return dispatch => {
    dispatch({type: ADD_CARD, {id: uuid(), card}})
  }
}

export const removeCard = id => {
  return dispatch => {
    dispatch({ type: REMOVE_CARD, id })
  }
}

export const updateCard = card => {
  return dispatch => {
    dispatch({ type: UPDATE_CARD, card})
  }
}
