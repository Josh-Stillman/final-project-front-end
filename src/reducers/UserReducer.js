const UserReducer = (state = {info: []}, action) => {
  switch (action.type) {
    case "IMPORT_USER_DATA":
      return {info: action.user}
      break
    default:
      return state
  }

}

export default UserReducer
