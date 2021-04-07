import { auth, googleProvider } from "../firebase"

const googleSignIn = async () => {
    await auth.signInWithPopup(googleProvider)
        .then((res) => {
            return res.user;
        }).catch((err) => {
            console.error(err)
        })
};

const logOut = async () => {
    await auth.signOut()
        .then(() => {
            console.log('done')
        }).catch((err) => {
            console.error(err);
        })
};

export {googleSignIn, logOut}