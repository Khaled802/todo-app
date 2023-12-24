import axios from "axios";
import { useAuthContext } from "../security/AuthContext";



const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    },
    // auth: {
    //     username: "user",
    //     password: "password"
    // }
});



export {apiClient};
// apiClient.interceptors.request.use((config)=> {
//     const { getUsername, getPassword } = useAuthContext()

//     apiClient.defaults.auth.username = getUsername()
//     apiClient.defaults.auth.password = getPassword()

//     return config
// })