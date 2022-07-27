import React from "react";
// import LoginGithub from "react-login-github";
import { asyncGitHubAuthAction } from "../../../store/action";
import { useDispatch } from "react-redux";
import LoginGithub from "react-login-github";
import { githubMark } from "../../../assets/icons";
import classes from "./GitHubButton.module.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const GitHubButton = ({ buttonText }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSuccess = response => {
    dispatch(asyncGitHubAuthAction(response))
    setTimeout(()=>{
        navigate('/main-page', {replace: true})
    },500)
  }

  return (
    <LoginGithub
      clientId="26fe1f792daba29c499e"
      redirectUri=""
      onSuccess={onSuccess}
      onFailure={ e => console.log('fail req github ===> ',e)}
      className={classes.button}
      children={
        <>
          {githubMark}
          <span>{buttonText}</span>
        </>
      }
    />
  )
};

export default GitHubButton;