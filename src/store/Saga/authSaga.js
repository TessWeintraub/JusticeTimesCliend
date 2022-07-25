import {put, takeEvery} from "redux-saga/effects"
import {getProfileAction, getTokenAction} from "../action";
import {ASYNC_LOGIN, ASYNC_REGISTER} from "../actionTypes";
import {instance} from "../instances";
import Cookies from "js-cookie";



function* registerWorker(action) {
  try {
    const request = yield instance.post('auth/registration', {...action.payload})
    console.log(request.data);
  }catch (e) {
    console.log("===>e", e);
  }

  // try {
  //   const res = yield instance.post('auth/login', {
  //     email: action.payload.email,
  //     password: action.payload.password
  //   })
  //   try {
  //     yield put(getTokenAction(res.data.token))
  //     const profileData = yield instance.patch("profile", {},
  //         {headers: {'Authorization': Cookies.get("TOKEN")}})
  //     try {
  //       yield put(getProfileAction(profileData.data))
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // } catch (e) {
  //   console.log(e)
  // }
}

function* loginWorker(action) {
  try {
    console.log(action.payload);
    const res = yield instance.post('auth/login', action.payload)
    console.log(res.data);
  }catch (e) {
    console.log(e);
  }

  // try {
  //   yield put(getTokenAction(res.data.token))
  //   const profileData = yield instance.patch("profile", {},
  //       {headers: {'Authorization': Cookies.get("TOKEN")}})
  //   try {
  //     yield put(getProfileAction(profileData.data))
  //   } catch (e) {
  //     console.log(e)
  //   }
  // } catch (e) {
  //   console.log(e)
  // }
}

export function* registerWatcher() {
  yield takeEvery(ASYNC_REGISTER, registerWorker)
}

export function* loginWatcher() {
  yield takeEvery(ASYNC_LOGIN, loginWorker)
}