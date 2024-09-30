import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.1.131:4224',
});

export const usePostsData = () => {
    const [postsData, setPostsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPostsData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get(`/community/getAllPosts`);
            setPostsData(response.data.posts || []);
        } catch (err) {
            console.error("Error fetching posts data:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPostsData();
    }, []);

    return { postsData, isLoading, error, refetchPosts: fetchPostsData };
};
