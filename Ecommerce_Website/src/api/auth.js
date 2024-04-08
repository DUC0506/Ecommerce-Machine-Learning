import { getToken } from "../utils/hepler";
import client from "./client";

export const resisterUser= async(user)=>{
    const token= getToken()
    try {
        const {data} =await client.post(`/auth/register`,user,{
        
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