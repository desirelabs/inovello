import React from 'react'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addCard } from '../store/card/actionsCreators'

const CreateCard = ({ addCard, colId, cardCount }) => (
  <a href="#" onClick={() => addCard({ text: '', colId })}>
    {cardCount === 0 ? '+ Créer une carte' : '+ Créer une nouvelle carte'}
  </a>
)

const mapStateToProps = state => {
  return {
    card: state.card
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCard: bindActionCreators(addCard, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCard)
