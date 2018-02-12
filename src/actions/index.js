import {adapter} from '../services'

export const fetchUser = () => dispatch => {
  dispatch({ type: 'ASYNC_START' });
  adapter.auth.getCurrentUser().then(user => {
    dispatch({ type: 'SET_CURRENT_USER', user });
  });
};

export const loginUser = (username, password, history) => dispatch => {
  //dispatch({ type: 'ASYNC_START' });

  adapter.auth.login({ username, password }).then(user => {
    localStorage.setItem('token', user.jwt);
    dispatch({ type: 'SET_CURRENT_USER', user });
    console.log(user);
    //history.push('/');
  });
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  return { type: 'LOGOUT_USER' };
};





export const import_transactions = (transactions) => {
  return {type: "IMPORT_TRANSACTIONS", transactions: transactions}
}
export const import_businesses = (businesses) => {
  return {type: "IMPORT_BUSINESSES", businesses: businesses}
}

export const import_user_data = (user) => {
  return {type: "IMPORT_USER_DATA", user: user}
}

export const fetch_transactions = (userId) => {
  console.log("fetch getting called");
  return (dispatch) => {
    fetch(`http://localhost:3000/users/${userId}/matched`)
    .then(res => res.json())
    .then(json=> {
      dispatch(import_transactions(json))
    })
  }
}
export const fetch_businesses = (userId) => {
  console.log("fetch biz getting called");
  return (dispatch) => {
    fetch(`http://localhost:3000/users/${userId}/businesses`)
    .then(res => res.json())
    .then(json=> {
      dispatch(import_businesses(json))
    })
  }
}

export const fetch_user_data = (user_id) => {
  console.log("fetch biz getting called");
  return (dispatch) => {
    fetch(`http://localhost:3000/users/${user_id}`)
    .then(res => res.json())
    .then(json=> {
      dispatch(import_user_data(json))
    })
  }
}

export const sort_transactions = (clickedColumn) => {
  return {type: "SORT_TRANSACTIONS", clickedColumn}
}
export const sort_businesses = (clickedColumn) => {
  return {type: "SORT_BUSINESSES", clickedColumn}
}
