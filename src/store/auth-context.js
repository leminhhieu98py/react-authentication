import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  idToken: null,
  isLoggedIn: false,
  login: (idToken, expiresIn) => {},
  logout: () => {},
});

const timeRemain = (expiresIn) => {
  const remainTime = expiresIn - new Date().getTime();
  return remainTime;
};

const getStoredToken = () => {
  const idToken = localStorage.getItem("idToken");
  const expiresIn = localStorage.getItem("expiresIn");

  return {
    idToken,
    expiresIn,
  };
};

const AuthContextProvider = (props) => {
  const [tokenData, setTokenData] = useState(getStoredToken());
  const [idToken, setIdToken] = useState(tokenData.idToken);
  const isLoggedIn = !!idToken;

  const login = (idToken, expiresIn) => {
    setIdToken(idToken);
    localStorage.setItem("idToken", idToken);
    localStorage.setItem("expiresIn", expiresIn);
    setTokenData(getStoredToken());
  };

  const logout = () => {
    setIdToken(null);
    localStorage.removeItem("idToken");
    localStorage.removeItem("expiresIn");
  };

  const authContext = {
    idToken,
    isLoggedIn,
    login,
    logout,
  };

  useEffect(() => {
    if (tokenData) {
      const remainTime = timeRemain(tokenData.expiresIn);
      const timer = setTimeout(() => {
        alert("Phiên đăng nhập hết hạn");
        logout();
      }, remainTime);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [tokenData]);

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
