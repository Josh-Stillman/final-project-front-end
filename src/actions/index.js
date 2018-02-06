export const import_transactions = (transactions) => {
  return {type: "IMPORT_TRANSACTIONS", transactions: transactions}
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

export const sort_transactions = (clickedColumn) => {
  return {type: "SORT_TRANSACTIONS", clickedColumn}
}
