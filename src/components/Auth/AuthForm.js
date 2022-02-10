import { useState, useRef, useContext } from "react";
import classes from "./AuthForm.module.css";
import { AUTH_URL } from "./../../constants/constants";
import callApi from "./../../utils/callApi";
import { AuthContext } from "./../../store/auth-context";
import { useHistory } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [warningText, setWarningText] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const authCxt = useContext(AuthContext);
  const history = useHistory();
  const { login } = authCxt;

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const validInput = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (
      (email.trim().length < 6 && !email.includes("@")) ||
      password.trim().length < 1
    ) {
      return false;
    }

    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const payload = {
      email,
      password,
      returnSecureToken: true,
    };

    if (!validInput()) {
      alert("Invalid input");
      return;
    }

    if (isLogin) {
      const signInUrl = AUTH_URL("signInWithPassword");
      callApi(signInUrl, "POST", payload)
        .then((res) => {
          const idToken = res.data.idToken;
          const expiresIn = new Date().getTime() + res.data.expiresIn * 1000;
          setWarningText("Sign in success");
          login(idToken, expiresIn);
          history.replace("/");
        })
        .catch((error) => {
          const res = error.response;
          if (res && res.data && res.data.error) {
            const errorText = res.data.error.message
              ? res.data.error.message
              : "";
            setWarningText(errorText);
          }
        });
    } else {
      // SIGN UP
      const signUpUrl = AUTH_URL("signUp");
      callApi(signUpUrl, "POST", payload)
        .then((res) => {
          const idToken = res.data.idToken;
          localStorage.setItem("idToken", idToken);
          setWarningText("Sign up success");
        })
        .catch((error) => {
          const res = error.response;
          if (res && res.data && res.data.error) {
            const errorText = res.data.error.message
              ? res.data.error.message
              : "";
            setWarningText(errorText);
          }
        });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailRef} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passwordRef} type="password" id="password" required />
        </div>
        <p style={{ color: "white" }}>{warningText}</p>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
