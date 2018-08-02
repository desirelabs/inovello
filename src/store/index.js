import { combineReducers } from 'redux'

import { columns } from './column/columnReducers'
import { cards } from './card/cardReducers'

const rootReducer = combineReducers({ columns })

export default rootReducer
