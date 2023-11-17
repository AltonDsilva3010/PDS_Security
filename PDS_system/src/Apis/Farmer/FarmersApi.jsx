
import axios from "axios"
import {toast} from "react-toastify"
import { preLoginApi } from "../../Apis/baseApi";
export const RegisterFarmer = async (data)=>{
    
    if(!data){
        toast.error("Data is missing")
        return
    }

    try{
        const res = await preLoginApi.post("/api/users/register/farmer",data)
        if(!res.data.error){
            toast.success(res.data.message)
        }else{
            toast.error(res.data.message)
        }
    }catch(err){
        toast.error(err)
    }
}