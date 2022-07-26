import {GET_POPULAR_ARTICLE} from "../actionTypes";

const defaultState = null

export const getPopularArticleReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_POPULAR_ARTICLE:
      return action.payload
    default:
      return state
  }
}