import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.1.131:4224',
});

export const useStoriesData = () => {
    const [storiesData, setStoriesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStoriesData = async () => {
        setIsLoading(true);
        try {
            const response = await api.get(`/community/getAllStories`);
            setStoriesData(response.data.stories);
        } catch (err) {
            console.error("Error fetching user data:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStoriesData();
    }, []);

    return { storiesData, isLoading, error, refetchStories: fetchStoriesData };
};
