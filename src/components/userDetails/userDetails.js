import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {FiLogOut} from 'react-icons/all'
import './userDetails.css'
import { logOut } from '../../services/auth';
const UserDetails = ({ userData,setUserData }) => {
    const signOut = async () => {
        await logOut()
            .then(() => {
                setUserData(null)
            })
        console.log('logout');
    };

    return (
        <div class="dropdown">
            <div className='user-dropDown dropdown-toggle' style={{height: '30px',marginRight: userData.photoURL?'0px':'60px'}} id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Welcome, <img src={userData.photoURL} className='user-image' height='100%' /> <span className='user-name'>{userData.displayName}</span>
            </div>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{textAlign:'center'}}>
                <li>
                    <Link class="dropdown-item" to="/profile">
                        User Profile
                    </Link>
                </li>
                <li style={{height: '2px',background:'black',opacity:'0.1',width:'80%',margin:'auto'}}></li>
                <li>
                    <div class="dropdown-item" style={{ color:'red',cursor:'pointer',margin:'10px 0px'}} onClick={signOut}>Logout <FiLogOut/></div>
                </li>
            </ul>
        </div>
    );
};

export default UserDetails