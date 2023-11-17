import axios from "axios"
// import { USER_INFO } from "../utils/constants"
// import Cookie from "js-cookie"
// export const postLoginApi = axios.create({baseURL:"http://localhost:5000" }) // post login postLoginApi

// postLoginApi.interceptors.request.use((req)=>{
//     if(Cookie.get(USER_INFO)){
//         const authorization = JSON.parse(Cookie.get(USER_INFO)).token
//         // console.log("BaseApi" , JSON.parse(localStorage.getItem(USER_INFO)).token)
//         req.headers.Authorization = `Bearer ${authorization}`
//     }
//     return req;
// })

export const preLoginApi = axios.create({baseURL : "http://localhost:5000"}) // prelogin api