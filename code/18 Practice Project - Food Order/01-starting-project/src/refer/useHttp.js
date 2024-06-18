import {useCallback, useEffect, useState} from "react";

async function sendHttpRequest(url, config) {
	const response = await fetch(url, config);
	if (!response.ok) throw Error("something went wrong");
	return await response.json();
}

function useHttp(url, config, initialData) {
	const [data, setData] = useState(initialData);
	const clearData = () => setData(initialData);

	const sendRequest = useCallback(async body => {
		const reqConfig = body ? {...config, body} : config;
		const resData = await sendHttpRequest(url, reqConfig);
		setData(resData);
	}, [url, config]);

	useEffect(() => {
		if (!config || !config.method || config.method === "GET")
			sendRequest();
	}, [sendRequest, config]);

	return {data, sendRequest, clearData};
}
