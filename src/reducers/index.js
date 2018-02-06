import { combineReducers } from 'redux'
import  TransactionReducer from './TransactionReducer'
import  BusinessReducer from './BusinessReducer'

const rootReducer = combineReducers({
  transactions: TransactionReducer,
  businesses: BusinessReducer
})

export default rootReducer
