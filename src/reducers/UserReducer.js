const UserReducer = (state = {info: [], loading: false}, action) => {
  switch (action.type) {
    case "IMPORT_USER_DATA":
      return {...state, info: action.user}
      break
    case "LOADING_TRANSACTION_TOGGLE":
      return {...state, loading: !state.loading}
      break
    default:
      return state
  }

}

export default UserReducer
