const alpha_desc = (a, b) => {
  let sort_num = 0
  if (a.toUpperCase() > b.toUpperCase()) {
    sort_num = -1
  } else if (a.toUpperCase() < b.toUpperCase()) {
    sort_num = 1
  }
  return sort_num
}

const TransactionReducer = (state = {all: [], column: "date", direction: "descending"}, action) => {
  switch (action.type) {
    case "IMPORT_TRANSACTIONS":
      return {all: action.transactions, column: 'date', direction: 'descending'}
      break;
    case "SORT_TRANSACTIONS":
      console.log(state.all);
      if (state.column !== action.clickedColumn) {
        let new_sort = state.all

        switch (action.clickedColumn) {
          case 'date':
            new_sort = state.all.sort((a,b) => Date.parse(b.date) - Date.parse(a.date))
            break;
          case 'business':
            new_sort = state.all.sort((a,b) => alpha_desc(a.description, b.description))
            break;
          case 'amount':
            new_sort = state.all.sort((a,b) => parseFloat(b.amount) - parseFloat(a.amount))
            break;
          case 'organization':
            new_sort = state.all.sort((a,b) => alpha_desc(a.business.name, b.business.name))
            break;
          case 'total_dem':
            new_sort = state.all.sort((a,b) => parseInt(b.business.total_dem) - parseInt(a.business.total_dem))
            break;
          case 'total_rep':
            new_sort = state.all.sort((a,b) => parseInt(b.business.total_rep) - parseInt(a.business.total_rep))
            break;
          case 'total_dem_pct':
            new_sort = state.all.sort((a,b) => parseFloat(b.business.total_dem_pct) - parseFloat(a.business.total_dem_pct))
            break;
          case 'total_rep_pct':
            new_sort = state.all.sort((a,b) => parseFloat(b.business.total_rep_pct) - parseFloat(a.business.total_rep_pct))
            break;
        }

        return {all: new_sort, column: action.clickedColumn, direction: "descending"}
      } else {
        return {all: state.all.reverse(), column: action.clickedColumn, direction: state.direction === 'ascending' ? 'descending' : 'ascending'}
      }
      break;
    default:
      return state
  }

}

export default TransactionReducer
