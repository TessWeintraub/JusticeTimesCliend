import createSagaMiddleware from "redux-saga"
import {applyMiddleware, combineReducers, createStore} from "redux";
import {all} from "redux-saga/effects"
import {loginWatcher, registerWatcher} from "./Saga/authSaga";
import {getProfileWatcher} from "./Saga/profileSaga"
import {getTokenReducer} from "./Reducers/getTokenReducer";
import {getProfileReducer} from "./Reducers/getProfilerReducer";
import {
  addArticleWatcher,
  getAllArticlesWatcher,
  getCategoriesWatcher,
  getMyArticlesWatcher,
  openArticleWatcher,
} from "./Saga/articleSaga";
import {getAllArticlesReducer} from "./Reducers/getAllArticlesReducer";
import {getMyArticlesReducer} from "./Reducers/getMyArticlesReducer";
import {openArticleReducer} from "./Reducers/openArticleReducer"
import {authReducer} from "./Reducers/authReducer"
import { getPopularArticleReducer } from "./Reducers/getPopularArticleReducer";
import {getCategoriesReducer} from "./Reducers/getCategoriesReducer";

export default function* rootSaga() {
  yield all([
    registerWatcher(),
    loginWatcher(),
    getProfileWatcher(),
    getAllArticlesWatcher(),
    getMyArticlesWatcher(),
    addArticleWatcher(),
    openArticleWatcher(),
    getCategoriesWatcher()
  ])
}

const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({
  getTokenReducer,
  getProfileReducer,
  categories: getCategoriesReducer,
  all: getAllArticlesReducer,
  popular: getPopularArticleReducer,
  getMyArticlesReducer,
  openArticleReducer,
  auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)