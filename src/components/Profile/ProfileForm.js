import classes from "./ProfileForm.module.css";
import { useState, useRef, useContext } from "react";
import { AuthContext } from "./../../store/auth-context";
import { AUTH_URL } from "./../../constants/constants";
import callApi from "./../../utils/callApi";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const passwordRef = useRef();
  const history = useHistory();
  const authCxt = useContext(AuthContext);
  const { idToken, logout } = authCxt;
  const [warningText, setWarningText] = useState("");

  const changePasswordHandler = (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const payload = {
      idToken,
      password,
      returnSecureToken: true,
    };
    const changePasswordUrl = AUTH_URL("update");
    callApi(changePasswordUrl, "POST", payload)
      .then((res) => {
        setWarningText("Change password success");
        logout();
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
  };

  return (
    <form onSubmit={changePasswordHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input ref={passwordRef} type="password" id="new-password" />
      </div>
      <p>{warningText}</p>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
