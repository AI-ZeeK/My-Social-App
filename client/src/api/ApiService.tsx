import axios from "axios";

const API = axios.create({
	baseURL: `https://my-social-app-gqkj.onrender.com`,
});

export const registerPostApi = async (formData: any) => {
	console.log(formData);
	const { data } = await API.post("/auth/register", formData, {
		headers: {
			"Access-Control-Allow-Origin": "*",
			maxBodyLength: 10000000,
			maxContentLength: 10000000,
			emulateJSON: true,
		},
	});
	console.log(data, data.headers);
	return data;
};
export const loginPostApi = async (formData: any) => {
	const { data } = await API.post("/auth/login", formData);

	return data;
};
export const PostApi = async (formData: any, token: any) => {
	console.log(formData);
	const { data } = await API.post("/posts", formData, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Access-Control-Allow-Origin": "*",
			maxBodyLength: 10000000,
			maxContentLength: 10000000,
			emulateJSON: true,
		},
	});

	console.log(data);
	return data;
};
export const getPostApi = async (token: any) => {
	const { data } = await API.get("/posts", {
		headers: {
			Authorization: `Bearer ${token}`,
			"Access-Control-Allow-Origin": "*",
		},
	});

	console.log(data);
	return data;
};
