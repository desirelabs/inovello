import React from 'react'
import { Button } from 'reactstrap'
import Input from '../HOC/Input'

const CreateColumn = ({ columnsCount, addColumn, onChange, inputValue, onToggle, toggled, refValue }) => (
  <div>
    {toggled ? (
      <div>
        <Input onChange={onChange} value={inputValue} onKeyPress={addColumn} onBlur={onToggle} toggled={toggled} />
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
