import { combineReducers } from 'redux'
import  TransactionReducer from './TransactionReducer'

const rootReducer = combineReducers({
  transactions: TransactionReducer
  //comments: commentsReducer
})

export default rootReducer
