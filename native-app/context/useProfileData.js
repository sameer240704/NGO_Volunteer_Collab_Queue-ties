import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    // baseURL: 'https://ams-server-omega.vercel.app/',
    baseURL: 'http://192.168.1.131:4224',
});

export const useUserData = () => {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');

                if (!userId) {
                    throw new Error("User ID not found");
                }

                const response = await api.get(`/auth/getUser/${userId}`);

                setUserData(response.data.user);
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return { userData, isLoading, error };
};
