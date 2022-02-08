export const initialState = {
  user: null,
  movieslist: [],
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_MOVIES: "SET_MOVIES",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionTypes.SET_MOVIES:
      return {
        ...state,
        movieslist: action.movieslist,
      };

    default:
      return state;
  }
};

export default reducer;
