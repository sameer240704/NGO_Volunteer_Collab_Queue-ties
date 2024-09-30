import { createContext, useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie'; 

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("ngo-user")) || null);

    useEffect(() => {
        if (authUser) {
            
            localStorage.setItem("ngo-user", JSON.stringify(authUser));

            Cookies.set('userId', authUser.userId, { expires: 7 }); 
            Cookies.set('userType', authUser.userType, { expires: 7 });
            Cookies.set('role', authUser.role, {expires: 7} );
            Cookies.set('userName', authUser.name, {expires: 7} ); 
        } else {
            
            Cookies.remove('userId');
            Cookies.remove('userType');
            Cookies.remove('role');
            Cookies.remove('userName');
        }
    }, [authUser]);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}