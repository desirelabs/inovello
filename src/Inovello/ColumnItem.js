import React from 'react'
import dots from './dots.svg'

const ColumnItem = ({ column }) => (
  <div style={wrapper}>
    {column.name}{' '}
    <a href="#">
      <img src={dots} alt="menu" style={img} />
    </a>
  </div>
)

const wrapper = { backgroundColor: '#dedede', borderRadius: '3px', minHeight: '76px' }

const img = { width: '26px', height: '26px', float: 'right', transform: 'rotate(-90deg)' }

export default ColumnItem
