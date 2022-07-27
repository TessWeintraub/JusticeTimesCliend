import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import Cookies from "js-cookie";
import { asyncGoogleAuthAction } from "../../../store/action";


const GoogleButton = ({ buttonText }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:`738556405944-8r64d24tknguv41a2gunpaco1jt8f7k1.apps.googleusercontent.com`,
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  const onSuccess = response => {
    console.log(response);
    dispatch(asyncGoogleAuthAction({token: response.accessToken}))

    setTimeout(()=>{
      if (JSON.parse(Cookies.get('is_auth')))
      {
        dispatch({type: 'SET_AUTH', payload : {isAuth: true, isLoading: false}})
        navigate('/main-page', {replace: true})
      }
    },500)
  }

  return (
    <>
      <GoogleLogin
        clientId='738556405944-8r64d24tknguv41a2gunpaco1jt8f7k1.apps.googleusercontent.com'
        buttonText={buttonText}
        onSuccess={onSuccess}
        onFailure={ e => console.log('GoogleAuthError ===> ', e)}
      />
    </>
  );
};

export default GoogleButton;