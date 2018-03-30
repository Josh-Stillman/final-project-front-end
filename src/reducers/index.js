import { combineReducers } from 'redux'
import  TransactionReducer from './TransactionReducer'
import  BusinessReducer from './BusinessReducer'
import  UserReducer from './UserReducer'
import  {AuthReducer} from './AuthReducer'
import DetailsReducer from './DetailsReducer'

const rootReducer = combineReducers({
  transactions: TransactionReducer,
  businesses: BusinessReducer,
  user: UserReducer,
  auth: AuthReducer,
  details: DetailsReducer
})

export default rootReducer
