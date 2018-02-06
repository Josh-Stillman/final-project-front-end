export const import_transactions = (transactions) => {
  return {type: "IMPORT_TRANSACTIONS", transactions: transactions}
}
export const import_businesses = (businesses) => {
  return {type: "IMPORT_BUSINESSES", businesses: businesses}
}

export const fetch_transactions = () => {
  console.log("fetch getting called");
  return (dispatch) => {
    fetch(`http://localhost:3000/users/matched`)
    .then(res => res.json())
    .then(json=> {
      dispatch(import_transactions(json))
    })
  }
}
export const fetch_businesses = () => {
  console.log("fetch biz getting called");
  return (dispatch) => {
    fetch(`http://localhost:3000/users/businesses`)
    .then(res => res.json())
    .then(json=> {
      dispatch(import_businesses(json))
    })
  }
}

export const sort_transactions = (clickedColumn) => {
  return {type: "SORT_TRANSACTIONS", clickedColumn}
}
export const sort_businesses = (clickedColumn) => {
  return {type: "SORT_BUSINESSES", clickedColumn}
}
