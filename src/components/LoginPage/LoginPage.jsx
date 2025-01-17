import React, {useEffect, useState} from "react"

import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux";

import Input from "../UI/Input/Input"
import Button from "../UI/Button/Button"
import {loginData} from "../../mockdata/appConstants"
import Cookies from "js-cookie";
import LoginPageClasses from "./LoginPage.module.css"
import {asyncLoginAction} from "../../store/action";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import GoogleButton from "../UI/GoogleButton/GoogleButton";
import GitHubButton from "../UI/GitHubButton/GitHubButton";

const LoginPage = () => {
  const [formState, setFormState] = useState(loginData)
  const [isDisableBtn, setIsDisableBtn] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const navigate = useNavigate();
  const validState = [];
  const dispatch = useDispatch()

  useEffect(() => {
    Object.keys(formState).map((i) => {
      validState.push(formState[i].isValid)
    });
    Object.keys(validState).map(() => {
      if (validState.filter((state) => !state).length) setIsDisableBtn(true)
      else setIsDisableBtn(false)
    });
  }, [validState, formState])



  const clickLoginBth = (e) => {
    e.preventDefault();
    const thisUser = {
      email: formState.email.value,
      password: formState.password.value
    }
    dispatch(asyncLoginAction(thisUser))

    setTimeout(()=>{
        navigate('/main-page', {replace: true})
    },300)
  };

  return (
      <>
        <Header/>
        <main className={LoginPageClasses["login__page"]}>
          <h1 className={LoginPageClasses["login__title"]}>
            Log in to your account
          </h1>
          <form noValidate={true} className={LoginPageClasses[`login__form`]}>
            <Input
                text="Email Address"
                name="email"
                type="email"
                notValidText="Please enter your username or email address."
                inputValue={inputValue}
                setInputValue={setInputValue}
                formState={formState}
                setFormState={setFormState}
            />
            <Input
                text="Password"
                name="password"
                type="password"
                notValidText="Please enter a password."
                inputValue={inputValue}
                setInputValue={setInputValue}
                formState={formState}
                setFormState={setFormState}
            />
            <Button
                name="Log in"
                variant="contained__login"
                onClick={ e => clickLoginBth(e)}
                isDisable={isDisableBtn}
            />
          </form>
          <div className={LoginPageClasses[`login__services_auth`]}>
            <GoogleButton
              buttonText='Log In'
            />
            <GitHubButton
              buttonText='Log In'
            />
          </div>
          <p className={LoginPageClasses[`login__subtitle`]}>
            Don’t have a Times account?{" "}
            <Link to="/sign-in">
              <span>Create one</span>
            </Link>
          </p>
        </main>
        <Footer/>
      </>
  );
};

export default LoginPage;
