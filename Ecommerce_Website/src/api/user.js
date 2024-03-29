import { getToken } from "../utils/hepler";
import client from "./client";

export const signInUser= async(userInfo)=>{
    try {
        const {data} =await client.post("/auth/login",userInfo);
        
        return data;
        
    } catch (error) {
       
        const{response}=error;

        if(response?.data) return response.data

        return {error:error.message || error}
        
    }
}

export const getUsers= async()=>{
    try {
        const {data} =await client.get("/user");
        
        return data;
        
    } catch (error) {
       
        const{response}=error;

        if(response?.data) return response.data

        return {error:error.message || error}
        
    }
}
export const getUser= async(userId)=>{
    try {
        const {data} =await client.get(`/user/${userId}`);
        console.log(data);
        return data;
        
    } catch (error) {
       
        const{response}=error;

        if(response?.data) return response.data

        return {error:error.message || error}
        
    }
}
export const getIsAuth= async()=>{
    const token= getToken()
    try {
        const {data} =await client.get(`/auth/is-auth`, {
            headers:{
                Authorization:'Bearer ' + token,
                
            },
        });
        
        return data;
        
    } catch (error) {
       
        const{response}=error;

        if(response?.data) return response.data

        return {error:error.message || error}
        
    }
}
export const removeUser= async(userId)=>{
    const token= getToken()
    try {
        const {data} =await client.delete(`/user/${userId}`,{
        
        headers:{
            Authorization:'Bearer ' + token,
            
        },
    });
        
        return data;
        
    } catch (error) {
       
        const{response}=error;

        if(response?.data) return response.data

        return {error:error.message || error}
        
    }
}
export const createUser= async(user)=>{
    const token= getToken()
    try {
        const {data} =await client.post(`/user/`,user,{
        
            headers:{
                Authorization:'Bearer ' + token,
                
            },
        });
        
        return data;
        
    } catch (error) {
       
        if (error.response && error.response.data) {
            // Nếu có dữ liệu lỗi được trả về từ server
            const errorMessage = error.response.data.message;
            console.log(errorMessage); // In ra thông báo lỗi từ server
            return errorMessage;
        } else {
            // Nếu không có dữ liệu lỗi từ server, in ra lỗi mặc định
            console.error('Unexpected error:', error);
            return 'An unexpected error occurred. Please try again later.';
        }
        
    }
}
export const updateUser= async(user)=>{
    try {
        const {data} =await client.patch(`/user/update-details`,user);
        
        return data;
        
    } catch (error) {
       
        const{response}=error;

        if(response?.data) return response.data

        return {error:error.message || error}
        
    }
}