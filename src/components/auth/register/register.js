import { useState,useContext } from "react"
import { Link, Redirect } from "react-router-dom"
import { auth } from "../../../firebase"
// import { useContext } from 'react'
import {UserContext} from '../../../context/context'
import Google from "../../google/google"
import '../auth.css'
const Register = ({ setUserData }) => {
    const [userPresent, setuserPresent] = useContext(UserContext).user;
    const [emailerror, setemailerror] = useState(false);
    const [email, setemail] = useState(false);
    const [smallPassword, setSmallPassword] = useState(false);
    const [userRegisterFormData, setUserRegisterFormData] = useState({
        email: '',
        password:'',
    })
    const handleChanged = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setemailerror(false);
        setemail(false);
        setSmallPassword(false);
        setUserRegisterFormData((preve) => {
            return {
                ...preve,
                [name]:value,
            }
        })
    }
    const register = async () => {
        
        await auth.createUserWithEmailAndPassword(userRegisterFormData.email, userRegisterFormData.password)
            .then((res) => {
                setUserData(res.user);
                setUserRegisterFormData({
                    email: '',
                    password: '',
                })
                setuserPresent(true);
            })            
            .catch((err) => {
                if (err.message == 'The email address is badly formatted.') {
                    setemailerror(true);
                }
                if (err.message == 'The email address is already in use by another account.') {
                    setemail(true);
                }
                if (err.message == 'Password should be at least 6 characters') {
                    setSmallPassword(true)
                }
            })
    };
    return (
        <div className="register-page">
            
            <div className="register-box">
                <div style={{ fontSize: "25px", marginBottom: '10px' }}>Register Page</div>
                {email ? (<div style={{ color:'red'}}>User Already exits</div>):null}
                <div className="register-inputs">
                    {/* TODO:inputs */}
                    <form className="form-floating mb-3">
                        <input name='email' type="email" className="form-control" id="floatingInputValue" placeholder="name@example.com" onChange={handleChanged} value={userRegisterFormData.email} />
                        <label htmlFor="floatingInputValue">Email address</label>
                    </form>
                    {emailerror ? (<div style={{ color:'red',fontSize:'15px'}}>PLs provide correct email</div>):null}
                    <div className="form-floating">
                        <input name='password' type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={handleChanged} value={userRegisterFormData.password} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    {smallPassword ? (<div style={{ color: 'red',fontSize:'15px' }}>Password Must be at least 6 characters</div>) : null}
                    <div className="register-btn" onClick={register}>
                        Register me
                    </div>
                </div>
                <div className="register-separator"></div>
                <div className="register-google-login-bth">
                    <Google setUserData={setUserData} />
                </div>
                <div className="register-google-login">
                    Already registered? <Link to="/login">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register