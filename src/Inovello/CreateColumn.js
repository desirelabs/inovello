import React from 'react'
import { Input, Button } from 'reactstrap'

const CreateColumn = ({ columnsCount, addColumn, onChange, inputValue, onToggle, toggled }) => (
  <div>
    {toggled ? (
      <div>
        <Input onChange={onChange} value={inputValue} onKeyPress={e => e.key === 'Enter' && addColumn()} />
        <Button onClick={() => addColumn()}>Ajouter une liste</Button>{' '}
        <a href="#" onClick={() => onToggle(false)}>
          &times;
        </a>
      </div>
    ) : (
      <a href="#" onClick={() => onToggle(true)}>
        {columnsCount === 0 ? '+ Ajouter une liste' : '+ Ajouter une autre liste '}
      </a>
    )}
  </div>
)

export default CreateColumn
