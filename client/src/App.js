import { useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import MainScreen from "./components/MainScreen";
import SignForm from "./components/SignForm";

function App() {

  const authenticated = useSelector(state => state.auth.isAuthenticated);

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