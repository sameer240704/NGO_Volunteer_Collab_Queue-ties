import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const api = axios.create({
    // baseURL: 'https://ams-server-omega.vercel.app/',
    baseURL: 'http://192.168.1.7:4224',
    withCredentials: true
});

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');

            if (token) {
                const response = await api.get('/auth/checkAuth', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.status === 200) {
                    setIsLoggedIn(true);
                    setUser(response.data.user);
                }
            }
        } catch (error) {
            console.error("Error checking authentication:", error.response || error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (phone, password) => {
        try {
            const response = await api.post('/auth/login', { phone, password });
            if (response.status === 200) {
                await AsyncStorage.setItem('userToken', response.data.token);
                await AsyncStorage.setItem('userId', response.data.userId);
                setIsLoggedIn(true);
                setUser(response.data.user);
                return response.data;
            }
        } catch (error) {
            console.error("Login error:", error.response || error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const formData = new FormData();

            formData.append('fullName', userData.fullName);
            formData.append('email', userData.email);
            formData.append('password', userData.password);
            formData.append('phone', userData.phone);
            formData.append('language', userData.language);

            formData.append('userImage', {
                uri: userData.userImage.uri,
                name: userData.userImage.name,
                type: userData.userImage.type,
            });

            const response = await api.post('/auth/register', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (response.status === 201) {
                await AsyncStorage.setItem('userToken', response.data.token);
                await AsyncStorage.setItem('userId', response.data.userId);
                setIsLoggedIn(true);
                setUser(response.data.user);
                return response.data;
            }
        } catch (error) {
            console.error("Registration error:", error.response || error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            setIsLoggedIn(false);
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;