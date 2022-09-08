import axios from "axios"

export const axiosPrivate = axios.create({
	baseURL: "http://192.168.1.243:8081",
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
})
