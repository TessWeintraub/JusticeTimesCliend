import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import Button from "../UI/Button/Button";

import navClasses from "./Nav.module.scss";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { useDispatch, useSelector } from "react-redux";

const Nav = ({ location }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuth } = useSelector((state) => state.auth)
  const logOut = () => {
    dispatch({type: 'SET_AUTH', payload : {isAuth: false, isLoading: false}})
    Cookies.set('is_auth', false)
    navigate('/login')
  }


  return (
    <nav className={navClasses[`${location}__nav`]}>
      <Link to="/main-page">
        <Logo
          className={navClasses[`${location}__logo`]}
          src={Logo}
          alt="Logo"
        />
      </Link>
      <div className={navClasses[`header__buttons`]}>
        {isAuth ?
          (
            <>
              <NavLink
                to="/main-page"
                className={({ isActive }) =>
                  isActive
                    ? navClasses[`active__link__${location}`]
                    : navClasses[`inactive__link__${location}`]
                }
              >
                All articles
              </NavLink>
              <NavLink
                to="/my-articles"
                className={({ isActive }) =>
                  isActive
                    ? navClasses[`active__link__${location}`]
                    : navClasses[`inactive__link__${location}`]
                }
              >
                My articles
              </NavLink>
              <NavLink
                to="/add-article"
                className={({ isActive }) =>
                  isActive
                    ? navClasses[`active__link__${location}`]
                    : navClasses[`inactive__link__${location}`]
                }
              >
                Add article
              </NavLink>
              <NavLink
                to="/profile"
                style={{ marginRight: "50px" }}
                className={({ isActive }) =>
                  isActive
                    ? navClasses[`active__link__${location}`]
                    : navClasses[`inactive__link__${location}`]
                }
              >
                Profile
              </NavLink>
              <Link to="/login">
                <Button
                  variant={`contained__${location}`}
                  name="Logout"
                  onClick={logOut}
                />
              </Link>
            </>
          )
          :
          (
          <>
            <Link to="/login">
              <Button variant={`outlined__${location}`} name="Log in" />
            </Link>
            <Link to="/sign-in">
              <Button variant={`contained__${location}`} name="Sign in" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
