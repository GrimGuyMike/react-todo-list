import "./App.css"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import SignInForm from './components/auth/SignInForm';
import LogOut from "./components/auth/LogOut";
import Help from "./components/Help";
import { loadUser } from "./state/actions/authActions";

function App() {

  const dispatch = useDispatch();

  useEffect(() => dispatch(loadUser()), [dispatch]);

  const [formOpen, setFormOpen] = useState(false);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  function formToggle() {
    setFormOpen(!formOpen);
  }

  return (
    <div className='App'>

      {
        isAuthenticated ?
        <LogOut /> :
        <SignInForm />
      }

      {isAuthenticated && <Help />}

      <Header formOpen={formOpen} onFormToggle={formToggle} />
      {formOpen && <AddTodo />}
      
      {
        isAuthenticated ?
        <Todos /> :
        <h2>Sign in to manage your tasks!</h2>
      }

      <Footer />

    </div>
  );

};

export default App;