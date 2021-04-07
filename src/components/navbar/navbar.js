// import {Navbar,Nav} from 'react-bootstrap'
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {auth} from '../../firebase'
import './navbar.css'
const Navbar = () => {
    const [userInfo, setUserInfo] = useState(null);
    useEffect( async () => {
        await auth.onAuthStateChanged((userInfo) => {
            if (userInfo) {
                console.log(userInfo);
            }
        })
    },[])

    return (
        <div className="navbar">
            <div className="navbar-logo">
                <NavLink to='/' className="navlink" activeStyle={{ color: 'black' }} exact>
                    Trip-Planner
                    </NavLink>
            </div>
            <div className="navbar-links">
                <div className="link home">
                    <NavLink to='/' className="navlink" activeStyle={{ color: 'black', opacity: '1', fontWeight: '500' }} exact>
                        Home
                    </NavLink>
                </div>
                <div className="link package">
                    <NavLink to='/package' className="navlink" activeStyle={{ color: 'black', opacity: '1', fontWeight: '500' }} exact>
                        Package
                    </NavLink>
                </div>
            </div>
            {
                userInfo ? (
                    <div>
                        {console.log("userInfo")}
                    </div>
                ) : (
                    <div className="register-btn">
                        <NavLink to='/register' className="navlink" activeStyle={{ color: 'black', opacity: '1', fontWeight: '500' }} exact>
                            Register
                        </NavLink>
                    </div>
                )
            }
        </div>
    );
}
export default Navbar