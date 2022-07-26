const defaultState = {
  items: [],
  meta: {}
}

export const getAllArticlesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_ALL_ARTICLES":
      return {...state, ...action.payload}
    default:
      return state
  }
}