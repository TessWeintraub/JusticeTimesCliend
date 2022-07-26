import React, { useEffect } from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import Cookies from "js-cookie";
import {publicRoutes, privateRoutes} from "./router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const AppRouter = () => {
  const cookieIsAuth = Cookies.get('is_auth') && JSON.parse(Cookies.get('is_auth'))
  const dispatch = useDispatch()
  const { isAuth } = useSelector((state) => state.auth)

  useEffect(()=>{
        if (cookieIsAuth) {
          axios.get('http://127.0.0.1:5000/auth/refresh', {
              headers: {
                "Content-Type": "application/json;charset=utf-8"
              },
              withCredentials: true
            }
          )
            .then(res => dispatch({ type: 'SET_AUTH', payload: { isAuth: true, isLoading: false } }))
            .catch(e => dispatch({ type: 'SET_AUTH', payload: { isAuth: false, isLoading: false } }))
        }},[])

  return (
    <Routes>
      {
        isAuth
          ?
          (
            <>
              {
                privateRoutes.map(item => (
                  <>
                  <Route
                    key={item.id}
                    element={item.element}
                    path={item.path}
                  />
                  <Route path='*' element={<Navigate to='/main-page'/>}/>
                  </>
                ))
              }
            </>
          )
          :
          (
            <>
              {
                publicRoutes.map(item => (
                    <Route
                      key={item.id}
                      element={item.element}
                      path={item.path}
                    />
                ))
              }
            </>
          )
      }
      <Route path='*' element={<Navigate to='/login'/>}/>
    </Routes>
  );
};

export default AppRouter;