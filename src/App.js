import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useContext } from "react";
import { AuthContext } from "./store/auth-context";

function App() {
  const authCxt = useContext(AuthContext);
  const { isLoggedIn } = authCxt;
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/auth">
          {!isLoggedIn ? <AuthPage /> : <Redirect to="/" />}
        </Route>
        <Route path="/profile">
          {isLoggedIn ? <UserProfile /> : <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
