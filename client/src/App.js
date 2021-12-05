import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ErrorMessage from "./components/ErrorMessage";
import Header from "./components/Header/";
import MainScreen from "./components/MainScreen/";
import AuthScreen from './components/AuthScreen/';
import { loadUser } from "./state/actions/authActions";
import { AUTH } from "./state/actions/types";
import StatusMessage from "./components/StatusMessage";

function App() {
  const dispatch = useDispatch();

  const {loading, isAuthenticated} = useSelector(state => state.auth);
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
      <Header authenticated={isAuthenticated} />

      {displayError()}

      <div id="content">
        {
          loading ?
          <StatusMessage text='Loading...'/> :
          (
            isAuthenticated ?
            <MainScreen /> :
            <AuthScreen />
          )
        }
      </div>
    </div>
  );
};

export default App;