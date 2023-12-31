import axios from "axios";

const Axios = axios.create({
	baseURL: "https://speed4ever.elsaed.aait-d.com/app",
});

Axios.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default Axios;