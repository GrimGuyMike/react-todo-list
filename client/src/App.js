import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import MainScreen from "./components/MainScreen";
import SignForm from "./components/SignForm";
import { loadUser } from "./state/actions/authActions";

function App() {

  const dispatch = useDispatch();

  const authenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <div className='App'>
      <Header />

      <div id="content">
        {authenticated ? <MainScreen /> : <SignForm />}
      </div>
    </div>
  );

};

export default App;