import { createContext, useState } from "react";

export const AuthContext = createContext({
  idToken: null,
  isLoggedIn: false,
  login: (idToken) => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [idToken, setIdToken] = useState(null);
  const isLoggedIn = !!idToken;

  const login = (idToken) => {
    setIdToken(idToken);
  };

  const logout = () => {
    setIdToken(null);
  };

  const authContext = {
    idToken,
    isLoggedIn,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
