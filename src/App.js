import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavbarC from './components/navbar/navbar';
import Home from './components/home/home';
import Login from './components/auth/login/login';
import Register from './components/auth/register/register';
import Package from './components/package/package';
import Hotels from './components/hotels/hotels';
import { useEffect, useState } from 'react';
import { auth } from './firebase';

function App() {
  const [userData, setUserData] = useState(null);
  useEffect(async() => {
    await auth.onAuthStateChanged((userInfo) => {
      if (userInfo) {
        setUserData(userInfo);
        console.log(userInfo);
      }
    })
  },[userData])
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarC userData={userData} setUserData={setUserData}/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/package">
            <Package />
          </Route>
          <Route path="/hotels">
            <Hotels />
          </Route>
          <Route>
            {
              userData ? (
                  <Redirect to='/' />
              ) : (
                <>
                  <Route path="/register">
                    <Register setUserData={setUserData} />
                  </Route>
                  <Route path="/login">
                    <Login setUserData={setUserData} />
                  </Route>
                </>
              )
            }
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
