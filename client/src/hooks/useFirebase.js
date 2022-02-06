import { useState, useEffect } from "react";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import initializeAuthentication from "../Firebase/firebase.init";
//initalize firebase app
initializeAuthentication()
const useFirebase = () => {
    const [user, setUser] = useState({})
    const [authError, setAuthError] = useState('');
    const auth = getAuth()
    const [isLoading, setIsLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    //google signing method
    const signInWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {

                const user = result.user;
                //saveUser(user.email, user.displayName, 'PUT')
                saveUser(user.email, user.displayName, 'PUT')
                setAuthError('')
                const destination = location?.state?.from || '/home';
                history.replace(destination)

            }).catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false))


    }


    //register with email password

    const registerUser = (email, password, name, history) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                setAuthError('');
                const newUser = { email, displayName: name }
                setUser(newUser)
                history.replace('/home')
                //save User to mongo Db
                saveUser(email, name, 'POST')
                //update profile data to firebase
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {

                }).catch((error) => {

                })



            })
            .catch((error) => {

                setAuthError(error.message)


            })
            .finally(() => setIsLoading(false))
    }

    //signIn function for user signin with email and pass
    const loginUser = (email, password, location, history) => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/home';
                history.replace(destination)
                setAuthError('');

            })
            .catch((error) => {

                setAuthError(error.message)
            })
            .finally(() => setIsLoading(false))
    }





    //signout function code
    const logOut = () => {
        setIsLoading(true)
        signOut(auth)
            .then(() => {

                setUser({})
            })
            .catch((error) => {
                // An error happened.
            })
            .finally(() => setIsLoading(false))

    }
    //if user chnage state then it will save auth data
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {


                setUser(user);
            } else {
                setUser({});

            }
            setIsLoading(false)
        });
        return () => unsubscribe;
    }, [])



    //save user to mongo DB
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('https://secret-wildwood-66619.herokuapp.com/users', {
            method: method,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then()
    }





    return {
        user,
        authError,
        logOut,
        signInWithGoogle,
        isLoading,
        registerUser,
        loginUser
    }
}
export default useFirebase;