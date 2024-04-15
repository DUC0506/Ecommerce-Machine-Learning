import { getToken } from "../utils/hepler";
import client from "./client";
export const getPromotions=async()=>{

    

    const token= getToken()
    try {
        const {data} =await client.get(`/promotion/`,
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
export const getPromotion=async(idPromotion)=>{

    

    const token= getToken()
    try {
        const {data} =await client.get(`/promotion/${idPromotion}`,
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
export const createPromotion=async(promotion)=>{

    

    const token= getToken()
    try {
        const {data} =await client.post(`/promotion/`,promotion,
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
export const updatePromotion=async(idPromotion,promotion)=>{

    

    const token= getToken()
    try {
        const {data} =await client.patch(`/promotion/${idPromotion}/details`,promotion,
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
export const removePromotion=async(idPromotion)=>{

    

    const token= getToken()
    try {
        const {data} =await client.delete(`/promotion/${idPromotion}`,
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