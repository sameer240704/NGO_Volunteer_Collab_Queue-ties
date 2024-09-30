import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    // baseURL: 'https://ams-server-omega.vercel.app/',
    baseURL: 'http://192.168.1.7:4224',
});

export const useFarmerData = () => {
    const [farmerData, setFarmerData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFarmerData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');

                if (!userId) {
                    throw new Error("User ID not found");
                }

                const response = await api.get(`/auth/getUser/${userId}`);

                setFarmerData(response.data.user);
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching farmer data:", err);
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchFarmerData();
    }, []);

    return { farmerData, isLoading, error };
};
