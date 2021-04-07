import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavbarC from './components/navbar/navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home/home';
import Login from './components/auth/login/login';
import Register from './components/auth/register/register';
import Package from './components/package/package';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarC/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/package">
            <Package/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
      </Switch>  
      </BrowserRouter>
    </div>
  );
}

export default App;
