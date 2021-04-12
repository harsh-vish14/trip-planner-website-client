// import {Navbar,Nav} from 'react-bootstrap'
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {auth} from '../../firebase'
import UserDetails from '../userDetails/userDetails';
import './navbar.css'
const Navbar = ({userData,setUserData}) => {
    // const [userInfo, setUserInfo] = useState(null);

    return (
        <div className="navbar">
            <div className="navbar-logo">
                <NavLink to='/' className="navlink" activeStyle={{ color: 'black' }} exact>
                    Trip-Planner
                    </NavLink>
            </div>
            <div className="navbar-links">
                <div className="link home">
                    <NavLink to='/' className="navlink" activeStyle={{ color: 'black', opacity: '1', fontWeight: '600' }} exact>
                        Home
                    </NavLink>
                </div>
                <div className="link package">
                    <NavLink to='/hotels' className="navlink" activeStyle={{ color: 'black', opacity: '1', fontWeight: '600' }} exact>
                        hotels
                    </NavLink>
                </div>
                <div className="link package">
                    <NavLink to='/package' className="navlink" activeStyle={{ color: 'black', opacity: '1', fontWeight: '600' }} exact>
                        Package
                    </NavLink>
                </div>
            </div>
            {
                userData ? (
                    <UserDetails userData={userData} setUserData={setUserData}/>
                ) : (
                    <div className="register-btn">
                        <NavLink to='/register' className="navlink" activeStyle={{ color: 'black', opacity: '1', fontWeight: '600' }} exact>
                            New User?
                        </NavLink>
                    </div>
                )
            }
        </div>
    );
}
export default Navbar