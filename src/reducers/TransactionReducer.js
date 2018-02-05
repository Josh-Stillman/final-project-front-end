const TransactionReducer = (state = {all: []}, action) => {
  switch (action.type) {
    case "IMPORT_TRANSACTIONS":
      return {all: action.transactions}
      break;
    default:
      return state
  }

}

export default TransactionReducer

//multiple reducers?
