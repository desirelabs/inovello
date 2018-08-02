import React from 'react'

const CreateCard = ({ onCreate, cardCount }) => (
  <a href="#" onClick={() => onCreate()}>
    {cardCount === 0 ? '+ Créer une carte' : '+ Créer une nouvelle carte'}
  </a>
)

export default CreateCard
