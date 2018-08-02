import { combineReducers } from 'redux'

import { columns } from './column/columnReducers'

const rootReducer = combineReducers({ columns })

export default rootReducer
