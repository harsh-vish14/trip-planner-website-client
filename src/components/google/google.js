import {useContext } from 'react';
import {FcGoogle} from 'react-icons/all'
import { Redirect } from 'react-router';
import { googleSignIn } from '../../services/auth'
import {UserContext} from '../../context/context'
import './google.css'

const Google = ({setUserData}) => {
    // const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userPresent, setuserPresent] = useContext(UserContext).user;
    const GoogleBtnClicked = async () => {
        var user = await googleSignIn()
        //(user);
        if (user) {
            setUserData(user);
            setuserPresent(true);
            // setUserLoggedIn(true);
            // setTimeout(() => {
            //     window.location.reload();
            // }, 1000);
        }
    }
    return (
        <div className="google-login-btn" onClick={GoogleBtnClicked}>
            <FcGoogle style={{marginRight:'10px',fontSize:'20px'}}/> Google Login
        </div>
    )
}

export default Google