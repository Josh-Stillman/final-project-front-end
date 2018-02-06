const alpha_desc = (a, b) => {
  let sort_num = 0
  if (a.toUpperCase() > b.toUpperCase()) {
    sort_num = -1
  } else if (a.toUpperCase() < b.toUpperCase()) {
    sort_num = 1
  }
  return sort_num
}

const BusinessReducer = (state = {all: [], column: "organization", direction: "descending"}, action) => {
  switch (action.type) {
    case "IMPORT_BUSINESSES":
      return {all: action.businesses, column: 'organization', direction: 'descending'}
      break;
    case "SORT_BUSINESSES":
      console.log(state.all);
      if (state.column !== action.clickedColumn) {
        let new_sort = state.all

        switch (action.clickedColumn) {
          case 'organization':
            new_sort = state.all.sort((a,b) => alpha_desc(a.name, b.name))
            break;
          case 'total_dem':
            new_sort = state.all.sort((a,b) => parseInt(b.total_dem) - parseInt(a.total_dem))
            break;
          case 'total_rep':
            new_sort = state.all.sort((a,b) => parseInt(b.total_rep) - parseInt(a.total_rep))
            break;
          case 'total_dem_pct':
            new_sort = state.all.sort((a,b) => parseFloat(b.total_dem_pct) - parseFloat(a.total_dem_pct))
            break;
          case 'total_rep_pct':
            new_sort = state.all.sort((a,b) => parseFloat(b.total_rep_pct) - parseFloat(a.total_rep_pct))
            break;
          case 'user_total':
            new_sort = state.all.sort((a,b) => parseFloat(b.user_total_spending) - parseFloat(a.user_total_spending))
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

export default BusinessReducer

//multiple reducers?
