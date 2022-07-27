import React, {useEffect, useState} from "react";

import {signinData} from "../../mockdata/appConstants";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux"
import {asyncRegisterAction} from "../../store/action";
import Cookies from "js-cookie";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

import SignInPageClasses from "./SignInPage.module.css";
import GoogleButton from "../UI/GoogleButton/GoogleButton";
import GitHubButton from "../UI/GitHubButton/GitHubButton";

const SignInPage = () => {
  const [isDisableBtn, setIsDisableBtn] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [formState, setFormState] = useState(signinData);
  const navigate = useNavigate();
  const validState = [];
  const dispatch = useDispatch()

  useEffect(() => {
    Object.keys(formState).map((i) => {
      validState.push(formState[i].isValid);
    });
    Object.keys(validState).map(() => {
      if (validState.filter((state) => !state).length) setIsDisableBtn(true);
      else setIsDisableBtn(false);
    });
  }, [formState]);


  const submitForm = (e) => {
    e.preventDefault();
    const newUser = {
      first_name: formState.firstName.value,
      last_name: formState.lastName.value,
      email: formState.email.value,
      password: formState.password.value,
    };

    dispatch(asyncRegisterAction(newUser))

    setTimeout(()=>{
      if (JSON.parse(Cookies.get('is_auth')))
      {
        dispatch({type: 'SET_AUTH', payload : {isAuth: true, isLoading: false}})
        navigate('/main-page', {replace: true})
      }
    },300)
  };

  return (
      <>
        <Header/>
        <main className={SignInPageClasses["signing__page"]}>
          <h1 className={SignInPageClasses["signing__title"]}>
            Create your free account
          </h1>
          <form noValidate={true} className={SignInPageClasses[`signing__form`]}>
            <Input
                text="First name"
                name="firstName"
                type="text"
                notValidText="Please enter a first name."
                inputValue={inputValue}
                setInputValue={setInputValue}
                formState={formState}
                setFormState={setFormState}
            />
            <Input
                text="Last name"
                name="lastName"
                type="text"
                notValidText="Please enter a last name."
                inputValue={inputValue}
                setInputValue={setInputValue}
                formState={formState}
                setFormState={setFormState}
            />
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
                name="Create account"
                variant="contained__login"
                isDisable={isDisableBtn}
                onClick={(e) => submitForm(e)}
            />
          </form>
          <div className={SignInPageClasses[`signing__services_auth`]}>
            <GoogleButton
              buttonText='Log In'
            />
            <GitHubButton
              buttonText='Log In'
            />
          </div>
        </main>
        <Footer/>
      </>
  );
};

export default SignInPage;
