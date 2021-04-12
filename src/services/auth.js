import { auth, googleProvider } from "../firebase"

const googleSignIn = async () => {
    await auth.signInWithPopup(googleProvider)
        .then((res) => {
            return res.user;
        }).catch((err) => {
            //error(err)
        })
};

const logOut = async () => {
    await auth.signOut()
        .then(() => {
            //('done')
        }).catch((err) => {
            //error(err);
        })
};

export {googleSignIn, logOut}