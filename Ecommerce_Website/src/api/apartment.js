
import client from "./client";
import { getToken } from "../utils/hepler";

export const getAllApartments=async()=>{

    const token= getToken()
  
 
     try {
         const {data} =await client.get(`/apartment/`,
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

 export const getApartment=async(id)=>{

    const token= getToken()
  
 
     try {
         const {data} =await client.get(`/apartment/${id}`,
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

 export const updateApartment=async(id,apartment)=>{

    const token= getToken()
  
 
     try {
         const {data} =await client.patch(`/apartment/${id}`,apartment,
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

 export const removeApartment=async(id)=>{

    const token= getToken()
  
 
     try {
         const {data} =await client.delete(`/apartment/${id}`,
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
 export const createApartment=async(apartment)=>{

    const token= getToken()
  
    console.log(apartment);
     try {
         const {data} =await client.post(`/apartment/`,apartment,
         {
             headers:{
                 Authorization:'Bearer ' + token,
                 'Content-Type': 'multipart/form-data',
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