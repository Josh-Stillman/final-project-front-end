import { combineReducers } from 'redux'
import  TransactionReducer from './TransactionReducer'
import  BusinessReducer from './BusinessReducer'
import  UserReducer from './UserReducer'
import  {AuthReducer} from './AuthReducer'

const rootReducer = combineReducers({
  transactions: TransactionReducer,
  businesses: BusinessReducer,
  user: UserReducer,
  auth: AuthReducer
})

export default rootReducer
