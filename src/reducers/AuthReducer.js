export const AuthReducer = (state = { currentUser: {} }, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      if (action.user.error) {
        return { ...state, currentUser: action.user };
      } else {
        const { id, username } = action.user;
        return { ...state, currentUser: { id, username } };
      }
    case 'LOGOUT_USER':
      return { ...state, currentUser: {} };
    default:
      return state;
  }
};
