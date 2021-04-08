import { useState } from "react"
import { Link } from "react-router-dom"
import { auth } from "../../../firebase"
import Google from "../../google/google"
import '../auth.css'

const Login = ({ setUserData }) => {
    const [nouser, setnouser] = useState(false);
    const [emailerror, setemailerror] = useState(false);
     const [userRegisterFormData, setUserRegisterFormData] = useState({
        email: '',
        password:'',
    })
    const handleChanged = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setnouser(false);
        setemailerror(false);
        setUserRegisterFormData((preve) => {
            return {
                ...preve,
                [name]:value,
            }
        })
    }
    const SubmitForm = async () => {
        await auth.signInWithEmailAndPassword(userRegisterFormData.email, userRegisterFormData.password)
            .then((res) => {
                setUserData(res.user);
                setUserRegisterFormData({
                 email: '',
        password:'',
            })
            })
            .catch((err) => {
             if (err.message === 'The email address is badly formatted.') {
                // TODO:add bad email err
                    setemailerror(true);
                }
                if (err.message === 'There is no user record corresponding to this identifier. The user may have been deleted.' || err.message === 'The password is invalid or the user does not have a password.') {
                    // TODO:add no user
                    setnouser(true);
                }
        })
    }
    return (
        <div className="register-page">
            <div className="register-box">
                <div style={{ fontSize: "25px", marginBottom: '10px' }}>Login Page</div>
                {nouser ? (<div style={{ color:'red'}}>Invalid email or password</div>):null}
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
                    <div className="register-btn" onClick={SubmitForm}>
                        Login
                    </div>
                </div>
                <div className="register-separator"></div>
                <div className="register-google-login-bth">
                    <Google setUserData={setUserData} />
                </div>
                <div className="register-google-login">
                    Not have account? <Link to="/register">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login