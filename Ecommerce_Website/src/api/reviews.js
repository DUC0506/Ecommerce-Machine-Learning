import client from "./client";
import { getToken } from "../utils/hepler";

export const getReviews=async(productId)=>{

   const token= getToken()


    try {
        const {data} =await client.get(`/review/?productId=${productId}`,
        {
            headers:{
                Authorization:'Bearer ' + token,
            },
        });

     
        return data;
        
    } catch (error) {
       console.log(error);
        return error
        
    }
}
export const addReviews=async(productId,review)=>{

    const token= getToken()
 
 
     try {
         const {data} =await client.post(`/review/?productId=${productId}`,review,
         {
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