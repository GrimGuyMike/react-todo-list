import { useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import SignForm from "./components/SignForm";

function App() {

  const authenticated = useSelector(state => state.auth.authenticated);

  return (
    <div className='App'>
      <Header />

      <div id="content">
        {!authenticated && <SignForm />}
      </div>
    </div>
  );

};

export default App;