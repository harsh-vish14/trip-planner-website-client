import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavbarC from './components/navbar/navbar';
import Home from './components/home/home';
import Login from './components/auth/login/login';
import Register from './components/auth/register/register';
import Package from './components/packages/package';
import Hotels from './components/hotels/hotels';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import User from './components/userProfile/userProfile';
import Footer from './components/footer/footer';

function App() {
  const [userData, setUserData] = useState(null);
  // const [userPresent, setUserPresent] = useState(true);
  useEffect(async () => {
    if (!userData) {
      await auth.onAuthStateChanged((userInfo) => {
        if (userInfo) {
          setUserData(userInfo);
          fetch('https://python-flask-api-trip.herokuapp.com/userLogin',
            { 
              method: 'POST',
              body: JSON.stringify({
                uid: userInfo.uid,
                name: userInfo.displayName,
                email: userInfo.email,
                userPhoto: userInfo.photoURL
              }),
              mode: 'cors'
            }).then((res) => {
              return res.json()
            })
            .then((data) => {
              // setUserPresent(true);
            })
            .catch((err) => {
          })
        }
      })
    }
    // }
  }, [userData]);
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarC userData={userData} setUserData={setUserData}/>
        <Switch>
          <Route exact path="/">
            <Home userData={userData} />
          </Route>
          <Route path="/package">
            <Package userData={userData} />
          </Route>
          <Route path="/hotels">
            <Hotels userData={userData} />
          </Route>
          <Route path="/user/:id" component={User} />
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
                      <Login setUserData={setUserData}  />
                  </Route>
                </>
              )
            }
          </Route>
        </Switch>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
