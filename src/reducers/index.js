import { combineReducers } from 'redux'
import  TransactionReducer from './TransactionReducer'
import  BusinessReducer from './BusinessReducer'
import  UserReducer from './UserReducer'

const rootReducer = combineReducers({
  transactions: TransactionReducer,
  businesses: BusinessReducer,
  user: UserReducer
})

export default rootReducer
