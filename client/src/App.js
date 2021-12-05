import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ErrorMessage from "./components/ErrorMessage";
import Header from "./components/Header";
import MainScreen from "./components/MainScreen";
import SignForm from "./components/SignForm";
import { loadUser } from "./state/actions/authActions";
import { AUTH } from "./state/actions/types";

function App() {
  const dispatch = useDispatch();

  const authenticated = useSelector(state => state.auth.isAuthenticated);
  const error = useSelector(state => state.error);

  const displayError = () => {
    switch(error.id) {
      default: return (
        <ErrorMessage error={error} />
      );

      case null:
      case AUTH.LOAD_USER_FAIL:
        return null;
    }
  };

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <div className='App'>
      <Header authenticated={authenticated} />

      {displayError()}

      <div id="content">
        {authenticated ? <MainScreen /> : <SignForm />}
      </div>
    </div>
  );
};

export default App;