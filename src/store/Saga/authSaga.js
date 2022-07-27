import {put, takeEvery} from "redux-saga/effects"
import {getProfileAction, getTokenAction} from "../action";
import { ASYNC_GITHUB_AUTH, ASYNC_GOOGLE_AUTH, ASYNC_LOGIN, ASYNC_LOGOUT, ASYNC_REGISTER } from "../actionTypes";
import {instance} from "../instances";



function* registerWorker(action) {
  try {
    const request = yield instance.post('auth/registration', {...action.payload})
    console.log(request.data);
  }catch (e) {
    console.log("===>e", e);
  }



  //     try {
  //       yield put(getProfileAction(profileData.data))
  //     } catch (e) {
  //       console.log(e)
  //     }
}

function* loginWorker(action) {
  try {
    yield instance.post('auth/login', {...action.payload})
    yield put({type: 'SET_AUTH', payload : {isAuth: true, isLoading: false}})
  }catch (e) {
    console.log(e);
  }
  //   try {
  //     yield put(getProfileAction(profileData.data))
  //   } catch (e) {
  //     console.log(e)
  //   }
}

function* logoutWorker() {
  try {
    yield instance.get('auth/logout')
    yield put({type: 'SET_AUTH', payload : {isAuth: false, isLoading: false}})
  }catch (e) {
    console.log('logout error ===>', e);
  }
}

function* googleWorker(action){
  try {
    yield instance.post('auth/google-authentication', action.payload)
  }catch (e) {
    console.log("google error ===>", e);
  }
}

function* githubWorker(action){
  try {
    yield instance.post('auth/github-authentication', action.payload)
    yield put({type: 'SET_AUTH', payload : {isAuth: true, isLoading: false}})
  }catch (e) {
    console.log("github error ===>", e);
  }
}

export function* googleWatcher() {
  yield takeEvery(ASYNC_GOOGLE_AUTH, googleWorker)
}

export function* githubWatcher() {
  yield takeEvery(ASYNC_GITHUB_AUTH, githubWorker)
}

export function* registerWatcher() {
  yield takeEvery(ASYNC_REGISTER, registerWorker)
}

export function* loginWatcher() {
  yield takeEvery(ASYNC_LOGIN, loginWorker)
}

export function* logoutWatcher() {
  yield takeEvery(ASYNC_LOGOUT, logoutWorker)
}
