import { createContext, useEffect, useState } from "react";
import { getAuth } from 'firebase/auth'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import app from "../firebase/firebase.config";


export const AuthContext = createContext()
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [loadingUser, setLoadingUser] = useState(true)
    const [user, setUser] = useState(null)
    const [userRole, setUserRole] = useState(null)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const loginWithGoogle = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setLoading(false)
            setUser(currentUser)
        });
        return () => unsubscribe();
    }, [])


    useEffect(() => {
        fetch(`http://localhost:5000/user?email=${user?.email}`)
            .then(res => res.json())
            .then(u => {
                setUserRole(u.role)
                setLoadingUser(false)
            })
    }, [user?.email])
    console.log(userRole)
    const authInfo = {
        user,
        loading,
        loadingUser,
        userRole,
        setUserRole,
        createUser,
        logIn,
        loginWithGoogle,
        updateUserProfile,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;