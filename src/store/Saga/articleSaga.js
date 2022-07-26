import {put, takeEvery} from "redux-saga/effects";
import {instance} from "../instances";
import {
  ASYNC_ADD_ARTICLE,
  ASYNC_GET_ALL_ARTICLES,
  ASYNC_GET_CATEGORIES,
  ASYNC_GET_MY_ARTICLES,
  ASYNC_OPEN_ARTICLE
} from "../actionTypes";
import {
  getAllArticlesAction,
  getMyArticlesAction,
  openArticleAction,
  getCategoriesAction
} from "../action";


function* getAllArticlesWorker(action) {
  const query = action.payload ? `?${action.payload}` : ''
  try {
    const allArticles = yield instance.get(`posts` + query)
    yield put(getAllArticlesAction(allArticles.data))
  } catch (e) {
    console.log(e)
  }
}

function* getMyArticlesWorker() {
  try{
    const myArticles = yield instance.get("my-posts")
    yield put(getMyArticlesAction(myArticles.data))
  } catch (e) {
    console.log(e)
  }
}

function* getCategoriesWorker() {
  try{
    const categories = yield instance.get("posts/tags")
    yield put(getCategoriesAction(categories.data))
  } catch (e) {
    console.log(e)
  }
}

function* addArticleWorker(action) {
  console.log(action);
  try{
    yield instance.post("posts", action.payload)
    const allArticles = yield instance.get("posts")
    yield put(getAllArticlesAction(allArticles.data))
  } catch (e) {
    console.log(e)
  }
}

function* articleOnClickWorker(action) {
  try {
    const newArticle = yield instance.get(`posts/${action.payload.id}`)
    yield put(openArticleAction(newArticle.data))
  } catch (e) {
    console.log(e)
  }
}

export function* getAllArticlesWatcher() {
  yield takeEvery(ASYNC_GET_ALL_ARTICLES, getAllArticlesWorker)
}

export function* getCategoriesWatcher() {
  yield takeEvery(ASYNC_GET_CATEGORIES, getCategoriesWorker)
}

export function* getMyArticlesWatcher() {
  yield takeEvery(ASYNC_GET_MY_ARTICLES, getMyArticlesWorker)
}

export function* addArticleWatcher() {
  yield takeEvery(ASYNC_ADD_ARTICLE, addArticleWorker)
}

export function* openArticleWatcher() {
  yield takeEvery(ASYNC_OPEN_ARTICLE, articleOnClickWorker)
}