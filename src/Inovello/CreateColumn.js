import React from 'react'
import { Input, Button } from 'reactstrap'

const CreateColumn = ({ columnsCount, addColumn, onChange, inputValue, toggle, onToggle }) => (
  <div>
    {toggle ? (
      <div>
        <Input onChange={onChange} value={inputValue} onKeyPress={e => e.key === 'Enter' && addColumn()} />
        <div style={{ display: 'flex' }}>
          <Button onClick={() => addColumn()}>Ajouter un liste</Button>
          <a href="#" onClick={() => onToggle(false)} style={closeButton}>
            &times;
          </a>
        </div>
      </div>
    ) : (
      <a href="#" onClick={() => onToggle(true)}>
        {columnsCount === 0 ? '+ Ajouter une liste' : '+ Ajouter une autre liste '}
      </a>
    )}
  </div>
)

const closeButton = {
  width: '37px',
  height: '37px',
  fontSize: '28px',
  lineHeight: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none'
}

export default CreateColumn
