const defaultState = {
  isAuth: false,
  isLoading: true
}

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}