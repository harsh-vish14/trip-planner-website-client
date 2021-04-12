import {FcGoogle} from 'react-icons/all'
import { googleSignIn } from '../../services/auth'
import './google.css'

const Google = ({setUserData}) => {
    const GoogleBtnClicked = async () => {
        var user = await googleSignIn();
        //(user);
        if (user) {
            setUserData(user);
        }
    }
    return (
        <div className="google-login-btn" onClick={GoogleBtnClicked}>
            <FcGoogle style={{marginRight:'10px',fontSize:'20px'}}/> Google Login
        </div>
    )
}

export default Google