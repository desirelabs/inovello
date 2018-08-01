import React from 'react'
import { Input } from 'reactstrap'

const CreateColumn = ({ columnsCount, addColumn, onChange, inputValue }) => (
  <div>
    <a href="#">{columnsCount === 0 ? '+ Ajouter une liste' : '+ Ajouter une autre liste '}</a>
    <Input onChange={onChange} value={inputValue} />
  </div>
)

export default CreateColumn
