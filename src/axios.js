import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "https://real-social-back.onrender.com/api/",
    withCredentials: true
})

