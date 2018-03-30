const DetailsReducer = (state = {business: []}, action) => {
  switch (action.type) {
    case "SET_BUSINESS":
    console.log("in details, set biz getting called")
      return {business: action.business}
      break;
    default:
      return state
  }

}

export default DetailsReducer
