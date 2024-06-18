import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest (url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message || "Something went wrong, failed to send request");
    return resData;
}

export default function useHttp (url, config, initialData) {
    const [data, setData] = useState(initialData);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const clearData = ()=> setData(initialData);

    const sendRequest = useCallback(async body => {
        setIsLoading(true);
        try {
            const reqConfig = body ? {...config, body} : config;
            const resData = await sendHttpRequest(url, reqConfig);
            setData(resData);
        } catch (error) {
            setError(error.message || "Something went wrong!");
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!config || config.method === "GET" || !config.method) {
            sendRequest();
        }

    }, [url, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    };

}